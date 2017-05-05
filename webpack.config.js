var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: {
    main:'./src/main.js'
  },
  output: { path: './public', filename: '[name].entry.js' },
  module: {
    loaders: [
      {
        include: /\.json$/,
        loaders: ["json-loader"]
      },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json'] 
  }
};