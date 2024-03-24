provider "aws" {
  region = "us-east-1"
}

resource "aws_key_pair" "keypair" {

  key_name   = "ansible-key"
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_instance" "jenkins_instance" {
  count         = 2
  ami           = "ami-080e1f13689e07408"
  instance_type = "t2.micro"
  key_name      = "aws_key_pair.keypair.key_name"
  tags = {
    Name = "jenkins-instance-${count.index + 1}"
  }
}

resource "local_file" "ansible_inventory" {
  depends_on = [aws_instance.jenkins_instance]

  filename = "ansible_inventory.ini"

  content = <<-EOT
[jenkins_instances]
${join("\n", aws_instance.jenkins_instance.*.public_ip)}
  EOT
}

resource "null_resource" "run_ansible_playbook" {
  depends_on = [local_file.ansible_inventory]

  provisioner "local-exec" {
    command = "ansible-playbook -i ansible_inventory.ini nginx-playbook.yml"
  }
}
