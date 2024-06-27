//1.原型链继承
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.arr = [1, 2, 3];
}
Person.prototype.say = function () {
  console.log(`${this.name}会说话！`);
};
function Son(name, age) {
  this.name = name;
  this.age = age;
}
Son.prototype = new Person(); //Son.prototype.__proto__=Person.prototype
//__proto__是[[prototype]]的访问器属性
console.log(Person.prototype.constructor.name);
console.log(Son.prototype.constructor.name);
//把构造器指向指回来
Son.prototype.constructor = Son;
const son = new Son("yl", "18");
const son2 = new Son("hjx", "20");
// son.say();
// son.arr.push(4);
// console.log(Son.prototype);
// console.log(son.arr);
// console.log(son2.arr);

/**
 * 缺点:
 * 1.所以子类共享父类的引用属性和方法
 * 2.在创建子类实例的时候不能向父类构造函数传递参数
 */
//2.构造函数继承（借助 call）
function Person2(name, age) {
  this.name = name;
  this.age = age;
  this.arr = [1, 2, 3];
  this.hello = function () {
    console.log(`${this.name}向您打招呼了`);
  };
}
Person2.prototype.say = function () {
  console.log(`${this.name}会说话！`);
};
function Son2(name, age) {
  Person2.call(this, name, age); //使用了 Person2.call 来借用父类 Person2 的构造函数
  //在this对象中调用运用父类Person2的方法和属性
}
Son2.prototype.intro = function () {
  console.log(`名字：${this.name};年龄:${this.age}`);
};
const a1 = new Son2("yl", 18);
const a2 = new Son2("zx", 12);
// a1.arr.push("hhh");
// console.log(a1);
// console.log(a2);
// a1.intro();
// a2.intro();
// // a1.say(); //子类不能获取父类原型对象上的方法
// a1.hello(); //可以获取父类实例对象上的方法
/**
 * 优点：
 * 1.在创建子类实例的时候能向父类构造函数传递参数
 *  Person2.call(this, name, age);
 * 2.避免了引用属性共享的问题
 *
 * 缺点：
 * 1.子类不能获取父类原型对象上的方法.可以获取父类实例对象上的方法
 *
 *
 */
//3.组合继承(借用构造函数+原型链继承)

function Person3(name, age) {
  this.name = name;
  this.age = age;
  this.arr = [1, 2, 3];
  this.hello = function () {
    console.log(`${this.name}向您打招呼了`);
  };
}
Person3.prototype.say = function () {
  console.log(`${this.name}会说话！`);
};
function Son3(name, age) {
  Person2.call(this, name, age); //使用了 Person2.call 来借用父类 Person2 的构造函数
  //在this对象中调用运用父类Person2的方法和属性
}

Son3.prototype = new Person3(); //Son3.prototype.__proto__=Person3.prototype;
//先继承原型再在原型上添加方法
Son3.prototype.intro = function () {
  console.log(`名字：${this.name};年龄:${this.age}`);
};
//*.修复构造器指向
Son3.prototype.constructor = Son3;
const b1 = new Son3("yl", 18);
const b2 = new Son3("zx", 12);
b1.arr.push("hhh");
console.log(b1);
console.log(b2);
b1.intro();
// b2.intro();
// b1.say(); //子类不能获取父类原型对象上的方法
b1.hello();

/**
 * 优点：
 * 1.结合了原型链继承和构造函数继承的优点，实例可以使用共享的原型方法。
   2.每个实例有自己的属性副本。
   缺点：
   1.父类构造函数调用了两次，一次在原型链上，一次在子类构造函数中，性能有所影响。
 */
//4.原型式继承
/**
 * 思路：思路：基于已有的对象来创建新的对象，
 * 原型式继承是通过使用一个临时构造函数和Object.create()方法来实现继承，
 * 向函数中传入一个对象，然后返回一个以这个对象为原型的对象。
 * 优点：
    创建新对象时不需要定义构造函数。
   缺点：
   所有实例共享引用类型属性。
 */
const parent = {
  name: "parent",
  colors: ["red", "blue", "green"],
  getName: function () {
    return this.name;
  },
};

const child = Object.create(parent); //child={__proto__:parent}
child.name = "child";
child.colors.push("black");

console.log(child.colors); // ["red", "blue", "green", "black"]
console.log(child.getName()); // "child"

const child2 = Object.create(parent);
console.log(child2.colors); // ["red", "blue", "green", "black"]

//5.寄生式继承

/**
 * 相当于直接调用inheritProtoType(Son4, Person4)
 * 优点：更灵活，能为对象添加额外的方法和属性。
   缺点：无法做到函数复用，每次创建对象都会创建一遍方法
 */
function createChild(original) {
  const clone = Object.create(original);
  clone.getName = function () {
    return this.name;
  };
  return clone;
}

const parent3 = {
  name: "parent",
  colors: ["red", "blue", "green"],
};

const child3 = createChild(parent);
child3.name = "child";
child3.colors.push("black");

console.log(child3.colors); // ["red", "blue", "green", "black"]
console.log(child3.getName()); // "child"

const child4 = createChild(parent3);
console.log(child4.colors); // ["red", "blue", "green", "black"]

//6.寄生组合式继承
/**
 * 只需要解决组合继承的缺点：少调用一次父类构造函数即可
 *
 */
function Person4(name, age) {
  this.name = name;
  this.age = age;
  this.arr = [1, 2, 3];
  this.hello = function () {
    console.log(`${this.name}向您打招呼了`);
  };
}
Person4.prototype.say = function () {
  console.log(`${this.name}会说话！`);
};
function Son4(name, age) {
  Person4.call(this, name, age); //使用了 Person2.call 来借用父类 Person2 的构造函数
  //在this对象中调用运用父类Person2的方法和属性
}
//修改这条语句
//   Son4.prototype = new Person4(); //Son3.prototype.__proto__=Person3.prototype;
inheritProtoType(Son4, Person4);
//先继承原型再在原型上添加方法
Son4.prototype.intro = function () {
  console.log(`名字：${this.name};年龄:${this.age}`);
};
const c1 = new Son4("yl", 18);
const c2 = new Son4("zx", 12);
c1.arr.push("hhh");
console.log(c1);
console.log(c2);
c1.intro();
// b2.intro();
// b1.say(); //子类不能获取父类原型对象上的方法
c1.hello();

//下面是一个专门用于原型链拷贝，并且不使用构造函数方法的函数
function inheritProtoType(child, parent) {
  const prototype = Object.create(parent.prototype); //{__proto__:(parent.prototype};
  prototype.constructor = child;
  child.prototype = prototype;
}
