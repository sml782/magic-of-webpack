/**** 同步返回 ****/

// {string} source
// {} map sourceMap 源代码映射
// {} metadata 元数据可以是任何东西, 如 AST , 会传递给下一个 loader 共享解析
module.exports = function mL(source, map, meta) {
  // source 为字符串形式内容
  // console.log(source);

  // 1. 直接返回
  // return source;

  // 2. this.callback
  // this.callback(
  //   err: Error | null,
  //   content: string | Buffer,
  //   sourceMap?: SourceMap, // 可选参数，返回source-map
  //   meta?: any // 可选参数，返回meta
  // );
  this.callback(null, source);
}