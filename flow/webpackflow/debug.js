const webpack = require('webpack');
// 读取配置文件
const config = require('./webpack.config.js');
// debugger;
const compiler = webpack(config);
function compilerCallback(err, stats) {
  const statsString = stats.toString();
  console.log(statsString);
}
compiler.run((err, stats) => {
  compilerCallback(err, stats);
});
