// class User {
//   private _password: string = "";
//   get password(): string {
//     return "******";
//   }
//   set password(newPass: string) {
//     this._password = newPass;
//   }
// }
// const user = new User();
// const pass1 = user.password;
// console.log(pass1);
// user.password = "123456";
// console.log(user.password);
// console.log(pass1 === user.password);

// //抽象类
// abstract class Animal {
//   abstract name: string;
//   abstract maskSound(): void;
// }
// class Cat extends Animal {
//   name: string = "小猫";
//   maskSound(): void {
//     console.log("喵喵喵");
//   }
// }

// //类实现接口(可以实现多个接口)  继承意指 类继承自父类（但继承不能继承多个）
// interface Animal2 {
//   name: string;
//   maskSound(): void;
// }
// interface B {
//   age: number;
// }
// class Dog implements Animal2, B {
//   name: string = "小狗";
//   age: number = 18;
//   maskSound(): void {
//     console.log("汪汪汪");
//   }
// }

// //泛型类
// class Myclass<T> {
//   public value: T;
//   constructor(value: T) {
//     this.value = value;
//   }
//   do(input: T): T {
//     console.log("处理数据", this.value);
//     return input;
//   }
// }
// const str = new Myclass<string>("hello");

// type ValueOf<T> = T[keyof T];

// type a = ValueOf<{ name: string; age: 20 }>;
// type b = keyof { name: string; age: 20 };

// for (const key in ) {
//   console.log(key);
// }
type Exclude1<T, U> = T extends U ? never : T;

// 相当于: type A = 'a'
type A = Exclude1<"x" | "a", "x" | "y" | "z">;
type cc = "x" | "a" extends "x" | "y" | "z" ? never : "x" | "a";
/**
 * 分析 Exclude1<"x" | "a", "x" | "y" | "z">
这里我们传入的类型是 "x" | "a" 作为 T，以及 "x" | "y" | "z" 作为 U。

TypeScript 中，条件类型 T extends U ? X : Y 会自动对联合类型进行分发。这意味着 Exclude1<"x" | "a", "x" | "y" | "z"> 会被分解为以下几部分分别进行条件判断：

"x" extends "x" | "y" | "z" ? never : "x"
"a" extends "x" | "y" | "z" ? never : "a"

第一个判断得到 never
第二个判断得到 "a"

最终结果是never|"a"="a"
 */

//得到c|d
interface SomeProps {
  a: string;
  b: number;
  c: (e: MouseEvent) => void;
  d: (e: TouchEvent) => void;
}
// 如何得到 'c' | 'd' ？

/**
 * 得到映射关系
 * {
 * a:never,
 * b:never,
 * c:'c',
 * d:'d'
 * }
 */
type GetKeyByValueType<T, Condition> = {
  [K in keyof T]: T[K] extends Condition ? K : never;
}[keyof T];
//[keyof T] 的作用是将对象类型的值提取并合并成一个联合类型。
// 第二步，索引取值
//never | never | 'c' | 'd'
type FunctionPropNames = GetKeyByValueType<SomeProps, Function>; // 'c' | 'd'
type AAA<T> = T extends { a: infer U; b: infer U } ? U : any;
type Foo = AAA<{ a: number; b: string }>; // type Foo = string | number
