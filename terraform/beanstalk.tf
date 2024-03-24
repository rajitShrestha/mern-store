data "aws_iam_role" "existing_role" {
  name = "ec2-elastic-beanstalk-role"
}

resource "aws_elastic_beanstalk_application" "frontend" {
  name        = "react-frontend"
  description = "react-frontend"
}

resource "aws_elastic_beanstalk_environment" "react-env" {
  name                = "react-frontend-env"
  application         = aws_elastic_beanstalk_application.frontend.name
  solution_stack_name = "64bit Amazon Linux 2023 v4.2.2 running Docker"
  
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = data.aws_iam_role.existing_role.name
  }

  # Additional configuration options
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t2.micro" # Example instance type, adjust as needed
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "EC2KeyName"
    value     = "jenkins-kp" # Replace with your EC2 key pair name
  }

  tags = {
    Environment = "Devel"

    Project = "book-store"
  }
}