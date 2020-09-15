/** ** 验证参数 *** */
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');

// {string} source
// {} map sourceMap 源代码映射
// {} metadata 元数据可以是任何东西, 如 AST , 会传递给下一个 loader 共享解析
module.exports = function mL(source, map, meta) {
  // { total: 7 }
  // 用于验证配置项
  const schema = {
    type: 'object',
    properties: {
      total: {
        type: 'number',
        // type: ['number', 'string'],
        // 错误描述
        // description: 'total 必须是个数字',
        // instanceof: 'Number'
      },
    },
    // 是否允许额外的属性
    additionalProperties: false,
  };
  // 用于配置错误信息
  const configuration = {
    // 加载器名称 默认值: 'Object'
    name: 'validate loader',
    // 基础数据名 默认值: 'configuration'
    baseDataPath: 'options',
    // 格式化错误
    // postFormatter(formattedError, error) {
    //   if (error.keyword === 'type') {
    //     return `${formattedError}\nAdditional Information.`;
    //   }

    //   return formattedError;
    // }
  };
  const options = loaderUtils.getOptions(this);
  validateOptions(schema, options, configuration);
  this.callback(null, source);
};
