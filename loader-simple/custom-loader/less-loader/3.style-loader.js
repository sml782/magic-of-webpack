/**** css运用 ****/

module.exports = function mL(source, map, meta) {
  const result = `
const style = document.createElement('style');
style.innerHTML = \`
${source}\`;
document.head.appendChild(style);
  `;
  this.callback(null, result);
}