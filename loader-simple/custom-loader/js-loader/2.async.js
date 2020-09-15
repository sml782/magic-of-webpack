/** ** 异步返回 *** */

// {string} source
// {} map sourceMap 源代码映射
// {} metadata 元数据可以是任何东西, 如 AST , 会传递给下一个 loader 共享解析
module.exports = function mL(source, map, meta) {
  // source 为字符串形式内容
  // console.log(source);

  // 1. this.async
  const callback = this.async();
  // return source;

  setTimeout(() => {
    const result = `${source }\n'这是异步产生的!'`;
    callback(null, result);
  }, 1000);
};
