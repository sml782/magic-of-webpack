
const { merge } = require('webpack-merge');
const config = require('./webpack.config');
const devServerConfig = require('./webpackDevServer.config');
module.exports = merge(config('development'), {
  devServer: devServerConfig()
});