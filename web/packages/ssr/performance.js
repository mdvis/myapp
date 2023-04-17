/**
 * name: 模块功能
 * author: Deve
 * date: 2020-08-10
 */

const [
  pnt,
  prt,,
  ppt,
] = performance.getEntries();
const old = performance.timing;
console.log(pnt, prt, ppt, old);
