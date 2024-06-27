const range = {
  from: 1,
  to: 10,
  [Symbol.iterator]: function interator() {
    return {
      current: this.from,
      last: this.to,
      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};
// range[Symbol.iterator] = function interator() {
//   return {
//     current: this.from,
//     last: this.to,
//     next() {
//       if (this.current <= this.last) {
//         return { done: false, value: this.current++ };
//       } else {
//         return { done: true };
//       }
//     },
//   };
// };
//对象是不可迭代的，可以手动实现Symbol.interator方法使其可迭代
for (const key of range) {
  console.log(key);
}
console.log([...range]);
console.log(Array.from(range));
