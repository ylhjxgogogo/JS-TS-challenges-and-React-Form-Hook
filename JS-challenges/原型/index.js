function Rabbit() {}
Rabbit.prototype = {
  eats: true,
};

let rabbit = new Rabbit();

Rabbit.prototype = {};
let rabbit2 = new Rabbit();
delete rabbit.eats;
// console.log(rabbit.eats);
Function.prototype.defer = function (ms) {
  setTimeout(this, ms);
};

function f() {
  console.log("num");
}
// f.defer(1000);
Function.prototype.defer2 = function (ms) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  let func = this; //this保存的是函数
  console.log("1----", this);
  function wrapper(...args) {
    console.log("2----", this);
    setTimeout(() => func.apply(this, args), ms);
  }
  return wrapper;
};
// f.defer2(1000)(1, 2);

//为dictionary添加toString方法
let dictionary = Object.create(null, {
  toString: {
    value() {
      return Object.keys(dictionary).join(",");
    },
  },
}); //描述器创建一个属性，它的标识默认是 false,不使用描述器的情况，默认全为true

// 你的添加 dictionary.toString 方法的代码

// Object.defineProperty(dictionary, "toString", {
//   enumerable: false,
//   writable: false,
//   configurable: false,
//   //这种代表值是一个函数
//   value() {
//     return Object.keys(dictionary).join(",");
//   },
// });

// 添加一些数据
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // 这里 __proto__ 是一个常规的属性键

// 在循环中只有 apple 和 __proto__
for (let key in dictionary) {
  console.log(key); // "apple", then "__proto__"
}

// 你的 toString 方法在发挥作用
console.log(dictionary + "111"); // "apple,__proto__"
