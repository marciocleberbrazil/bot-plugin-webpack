const path = require('path');

module.exports = {
  mode: 'production',
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              "@babel/plugin-proposal-class-properties",
            ]
          },
        }
      },
      {
        test: /\.scss$/,
        use: [
          'raw-loader',
          {
            loader:'sass-loader',
            options: { 
              sassOptions:{
                includePaths: [path.resolve(__dirname, 'node_modules')]
              },
            },
          },
        ],  
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  }
}