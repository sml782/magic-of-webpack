import a from './c/a';
import b from './c/b';

const str = '这里是简版webpack';
const newStr = str.split('').reverse().join('');
const arr = [1, 2, 3];
const newArr = arr.map(item => item ** 2);
console.log(newStr + a + b, newArr);