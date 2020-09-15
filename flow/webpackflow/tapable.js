/**
 * button.addEventListener('click',()=>{console.log('click')});
 * button.trigger('click');
 */

// const { SyncHook } = require('tapable');

class SyncHook{
  constructor(){
    this.taps = []
  }
  tap(name, fn){
    this.taps.push(fn);
  }
  call(){
    this.taps.forEach(tap => tap());
  }
}
const hook = new SyncHook();
// hook.addEventListener();
hook.tap('some name', () => {
  console.log('some name');
});
hook.call();
/* 
function add(){}
add.call(); */
// webpack-dev-server memory-fs