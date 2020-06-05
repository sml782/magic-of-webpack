/**** 获得参数 ****/
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');

// {string} source
// {} map sourceMap 源代码映射
// {} metadata 元数据可以是任何东西, 如 AST , 会传递给下一个 loader 共享解析
module.exports = function mL(source, map, meta) {
  // { total: 7 }
  const schema = {
    type: 'object',
    properties: {
      total: {
        type: 'number',
        // type: ['number', 'string'],
        // 错误描述
        // description: 'total 必须是个数字',
        // instanceof: 'Number'
      }
    },
    // 是否允许额外的属性
    additionalProperties: false,
  }
  const options = loaderUtils.getOptions(this);
  // const title = options.title || '默认标题';
  console.log(validateOptions);
  validateOptions(schema, options, {

  });
  this.callback(null, source);
}