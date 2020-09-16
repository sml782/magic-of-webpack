function loader(source) {
  console.log('normal1');
  return `${source }//normal1`;
}
// loader.pitch = function (remainingRequest, precedingRequest, data) {
//   console.log({ remainingRequest, precedingRequest, data });
//   // ! 如果返回值将停止执行接下来的 loader
//   return 'normal1pitch';
//   // return null;
// };
module.exports = loader;
