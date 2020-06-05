/**** less编译 ****/
const less = require('less');

module.exports = function mL(source, map, meta) {
  const callback = this.async();

  // 回调形式调用
  // less.render(source, (error, output) => {
  //   console.log({ error, output });
  //   if (error) {
  //     return callback(error);
  //   }
  //   const { css, map, imports } = output;
  //   const cMap = typeof map === 'string' ? JSON.parse(map) : map;
  //   callback(null, css, cMap);
  // })

  // Promise 形式
  less.render(source)
    .then(({ css, map, imports }) => {
      console.log({ css, map, imports })
      const cMap = typeof map === 'string' ? JSON.parse(map) : map;
      callback(null, css, cMap);
    })
    .catch(error => {
      callback(error);
    });
}