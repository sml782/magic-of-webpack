// 执行构建
const Webpack = require('./lib/webpack');
const options = require('./webpack.config');

const ins = new Webpack(options);
ins.run();