const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  target: 'node', // Specify the target environment as Node.js
  // Add other webpack configurations as needed
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  node: '16.14', // Ensure compatibility with Node.js version 16.14
                },
              }],
            ],
          },
        },
      },
    ],
  },
};
