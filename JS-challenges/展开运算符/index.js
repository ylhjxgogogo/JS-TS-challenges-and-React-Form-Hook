const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]: function () {
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
const a = { ...range }; //用在对象字面量中时，会枚举自有属性；
const b = [...range]; //用在函数参数或数组字面量中时，会迭代其中的元素。
console.log(a);
console.log(b);
