const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: path.resolve('public/static'),
    publicPath: '/',
    disableHostCheck: true,
  },
});
