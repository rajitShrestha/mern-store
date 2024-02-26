const path = require('path');

module.exports = {
    entry: './backend/src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    target: 'node', // Important for building a Node.js backend
    mode: 'production' // Or 'development' depending on your needs
};
