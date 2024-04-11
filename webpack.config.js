const path = require('path');

const config = {
    mode: 'none',
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            use: [
              {
                loader: "ts-loader",
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  }
};

module.exports = config;