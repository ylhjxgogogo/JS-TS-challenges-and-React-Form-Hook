//1.延时器
// function printNumbers(from, to) {
//   function print() {
//     console.log(from);
//     if (from < to) {
//       setTimeout(print, 1000);
//     }
//     from++;
//   }
//   setTimeout(print, 1000);
// }
// function printNumbers2(from, to) {
//   function print() {
//     console.log(from);
//     if (from === to) {
//       clearInterval(timerId);
//     }
//     from++;
//   }
//   print();
//   let timerId = setInterval(print, 1000);
// }
// printNumbers2(1, 5);

let timers = [];
const start = Date.now();
//证明0毫秒不是真正的0毫秒
setTimeout(function f() {
  const now = Date.now();
  timers.push(now - start);
  if (now - start > 100) {
    //100毫秒过后，返回记录的数组
    console.log(timers);
  } else {
    setTimeout(f, 0);
  }
}, 0);
