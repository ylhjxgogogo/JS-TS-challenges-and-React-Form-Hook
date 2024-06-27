type Keys = "a" | "b" | "c";

type Obj = {
  [p in Keys]: p;
}; // -> { a: "a", b: "b", c: "c" }
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string;
}

type XY = X & Y;
type YX = Y & X;

let p: XY;
let q: YX;
// 同名且基本类型的合并 c=string&number 混合起来变成never
// p = { c: 6, d: "d", e: "e" };
// q = { c: 6, d: "d", e: "e" };

//同名且非基本类型的合并 ，可以直接合并成一个对象
interface D {
  d: boolean;
}
interface E {
  e: string;
}
interface F {
  f: number;
}

interface AA {
  x: D;
}
interface B {
  x: E;
}
interface C {
  x: F;
}

type ABC = AA & B & C;

const abc: ABC = {
  x: {
    d: true,
    e: "semlinker",
    f: 666,
  },
};

console.log("abc:", abc);
class Person {
  _name: string;
  age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this._name}!`);
  }
}

const semlinker = new Person("Semlinker", 18);

console.log(semlinker._name);
//     ~~~~~
// Property '#name' is not accessible outside class 'Person'
// because it has a private identifier.
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
//类名本身代表的是类的实例
// 表示类本身的两种方式
// typeof Point
//使用构造函数
//构造函数写成对象形式
type PersonConstrcutor1 = {
  new (x: number, y: number): Point;
};
type PersonConstrcutor2 = new (x: number, y: number) => Point;
function createPoint(PointClass: PersonConstrcutor2, x: number, y: number) {
  return new PointClass(x, y);
}
