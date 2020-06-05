/**** 获得参数 ****/
const loaderUtils = require('loader-utils');

// {string} source
// {} map sourceMap 源代码映射
// {} metadata 元数据可以是任何东西, 如 AST , 会传递给下一个 loader 共享解析
module.exports = function mL(source, map, meta) {
  // source 为字符串形式内容
  // console.log(source);

  // 1. this.query
  // 此属性只能读取对象形式参数，query读到的是字符串形式，需借助工具
  // console.log(this.query);
  // const title = this.query.title || '默认标题';

  // 2. loader-utils
  // 此插件可解析字符串形式, ?title=666
  const options = loaderUtils.getOptions(this);
  console.log(options);
  const title = options.title || '默认标题';

  const result = source.replace(/\{\{\s*title\s*\}\}/, title);
  this.callback(null, result);
}