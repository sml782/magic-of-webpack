// 当前的工作目录
const path = require('path');

const appDirectory = process.cwd();
console.log(appDirectory);
// 从相对路径中解析绝对路径
const resolveApp = (relativePath) => {
  return path.resolve(appDirectory, relativePath);
};
const r = resolveApp('./index.js');
console.log(r);
