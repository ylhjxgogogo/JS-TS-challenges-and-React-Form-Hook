class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    console.log(this.value);
  }
}
function Button2(name) {
  this.name = name;
}
Button2.prototype.click = function () {
  console.log(this.name);
};
let button = new Button("hello");
let button2 = new Button2("hello");

setTimeout(button.click(), 1000); // undefined
setTimeout(button2.click(), 1000);
// 用纯函数重写 class User

// 1. 创建构造器函数
function User(name) {
  this.name = name;
}
// 函数的原型（prototype）默认具有 "constructor" 属性，
// 所以，我们不需要创建它

// 2. 将方法添加到原型
User.prototype.sayHi = function () {
  console.log(this.name);
};

// 用法：
let user = new User("John");
user.sayHi();
