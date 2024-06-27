// 实现 myCall 方法
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis; // 在非严格模式下，context为null或undefined时默认指向全局对象
  const fnSymbol = Symbol(); // 创建一个唯一的符号
  context[fnSymbol] = this; // 将函数作为context的属性
  const result = context[fnSymbol](...args); // 调用函数
  delete context[fnSymbol]; // 删除该属性
  return result;
};

// 实现 myApply 方法
Function.prototype.myApply = function (context, args) {
  context = context || globalThis;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args); // 使用扩展运算符传递数组参数
  delete context[fnSymbol];
  return result;
};

// 实现 myBind 方法
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  function boundFunction(...args2) {
    return fn.myApply(
      this instanceof boundFunction ? this : context,
      args.concat(args2)
    );
  }

  // 维护原型链
  boundFunction.prototype = Object.create(fn.prototype);
  return boundFunction;
};

// 测试用例
function test(a, b) {
  console.log(this.name, a, b);
}

const obj = { name: "Test" };

const boundTest = test.myBind(obj, 1);
boundTest(2); // 输出: Test 1 2

const newTest = new boundTest(3); // 在 new 操作符下调用
console.log(newTest instanceof test); // true
console.log(test.prototype.constructor === "test");
function Rabbit() {}
console.log(Rabbit.prototype.constructor == Rabbit);
