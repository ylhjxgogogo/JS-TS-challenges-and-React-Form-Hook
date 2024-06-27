import { never } from "zod";
import React from "react";

/**
 *Parameters 用于提取函数类型的参数类型成一个数组
 */
type ParametersRes = Parameters<(name: string, age: number) => {}>; //官方用法 [name:string,age:number]
//手动实现
type MyParameters<T extends (...arg: any) => any> = T extends (
  ...arg: infer P
) => any
  ? P
  : never;
type ParametersRes2 = MyParameters<(name: string, age: number) => {}>;

/**
 * ReturnType 用于提取函数类型的返回值类型。
 */
type ReturnTypeRes = ReturnType<() => "dong">; //dong
//手动实现MyReturnType
type MyReturnType<T extends (...arg: any) => any> = T extends (
  ...arg: any
) => infer R
  ? R
  : never;
type ReturnTypeRes2 = MyReturnType<() => "dong">;
/**
 * Parameters 用于提取函数参数的类型，
 * 而 ConstructorParameters 用于提取构造器参数的类型。
 * T通过 extends 约束为构造器类型，
 * 加个 abstract 代表不能直接被实例化（其实不加也行）。
 */
interface Person {
  name: string;
}

interface PersonConstructor {
  new (name: string): Person;
}

type ConstructorParametersRes = ConstructorParameters<PersonConstructor>;
//手动实现
type MyConstructorParameters<T extends abstract new (...arg: any) => any> =
  T extends abstract new (...arg: infer P) => any ? P : never;
type ConstructorParametersRes2 = MyConstructorParameters<PersonConstructor>;

/**
 *提取了构造器参数的类型，自然也可以提取构造器返回值的类型，就是 InstanceType。
 */

type InstanceTypeRes = InstanceType<PersonConstructor>;
//手动实现
type MyInstanceType<T extends abstract new (...arg: any) => any> =
  T extends abstract new (...arg: any) => infer R ? R : never;
type InstanceTypeRes2 = MyInstanceType<PersonConstructor>;

/**
 *函数里可以调用 this，这个 this 的类型也可以约束
 this 的类型也可以提取出来
 * @param this
 */

function hello(this: Person) {
  console.log(this.name);
}

// hello.call({});

type ThisParameterTypeRes = ThisParameterType<typeof hello>;
//手动实现
type MyThisParameterType<T> = T extends (
  this: infer ThisType,
  ...arg: any[]
) => any
  ? ThisType
  : never;
type ThisParameterTypeRes2 = MyThisParameterType<typeof hello>;
/**
 *删除 this 的类型可以用 OmitThisParameter。
 * @param this
 * @param age
 * @returns
 */

function say(age: number) {
  //   console.log(this.name);
  //   return this.name + " " + age;
  return age;
}

type OmitThisParameterRes = OmitThisParameter<typeof say>;
//手动实现
type MyOmitThisParameter<T> = T extends (
  this: any,
  ...arg: infer Args
) => infer R
  ? (...args: Args) => R
  : never;
type OmitThisParameterRes2 = MyOmitThisParameter<typeof say>;
/**
 * Omit 排除某一个索引
 */
type OmitRes = Omit<{ name: "guang"; age: 20 }, "name">;
//手动实现
type MyOmit<Obj extends object, Key extends keyof Obj> = {
  [k in keyof Obj as k extends Key ? never : k]: Obj[k];
};
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type OmitRes2 = MyOmit<{ name: "guang"; age: 20 }, "age">;
/**
 * 把索引变成可选
 */
type PartialRes = Partial<{ name: "dong"; age: 18 }>;
//手动实现
type MyPartial<Obj extends object> = {
  [k in keyof Obj]?: Obj[k];
};
type PartialRes2 = MyPartial<{ name: "dong"; age: 18 }>;
/**
 * 把索引变成必选，即去掉可选
 */
type RequiredRes = Required<{ name?: "dong"; age?: 18 }>;
//手动实现
type MyRequired<Obj extends object> = {
  [k in keyof Obj]-?: Obj[k];
};
type RequiredRes = MyRequired<{ name: "dong"; age: 18 }>;
/**
 * 添加可读，实现方法同上，前面全部加个 readonly即可
 */

type ReadonlyRes = Readonly<{ name: "dong"; age: 18 }>;
/**
 *映射类型的语法用于构造新的索引类型
 ，在构造的过程中可以对索引和值做一些修改或过滤。
 */

type PickRes = Pick<{ name: "dong"; age: 18; sex: 1 }, "name" | "age">;
//手动实现
type MyPick<T, Key extends keyof T> = {
  [k in Key]: T[k];
};
type PickRes2 = MyPick<{ name: "dong"; age: 18; sex: 1 }, "name" | "sex">;
/**
 *Record 用于创建索引类型，传入 key 和值的类型
  keyof any，它的结果是 string | number | symbol
 */
type RecordRes = Record<"a" | "b", number>;
type MyRecord<K extends keyof any, T> = {
  [k in K]: T;
};
//传入字面量类型的索引
type RecordRes3 = MyRecord<"a" | "b", string>;
//当传入的 K 是 string | number | symbol，那么创建的就是有可索引签名的索引类型：
type RecordRes2 = Record<string, number>;
type RecordRes4 = MyRecord<number, string>; //{ [x: number]: string;}

/**
 * 当想从一个联合类型中去掉一部分类型时，可以用 Exclude 类型
 */
type ExcludeRes = Exclude<"a" | "b" | "c" | "d", "a" | "b">;
//联合类型当作为类型参数出现在条件类型左边时，会被分散成单个类型传入，这叫做分布式条件类型。
type MyExclude<T, U> = T extends U ? never : T; //never|'a'='a'
type ExcludeRes2 = MyExclude<"a" | "b" | "c" | "d", "a" | "b">;

/**
 * 从联合类型中保留一些类型
 */
type ExtractRes = Extract<"a" | "b" | "c" | "d", "a" | "b">;
//手动实现
type MyExtract<T, U> = T extends U ? T : never;
type ExtractRes2 = MyExtract<"a" | "b" | "c" | "d", "a" | "b">;

/**
 *在递归那节我们写过取 Promise 的 ValuType 的高级类型，
 这个比较常用，ts 也给内置了，就是 Awaited。
 内置的高级类型不再限制必须是 Promise，而是只要对象且有 then 方法就可以
 */
type MyAwaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F): any } //thenable对象，实现了then方法的，非标准promise对象
  ? F extends (value: infer V, ...args: any) => any
    ? MyAwaited<V>
    : never
  : T;

type MyAwaitedRes = MyAwaited<Promise<Promise<Promise<number>>>>;
/**
 * NonNullable 就是用于判断是否为非空类型，也就是不是 null 或者 undefined 的类型的
 */
//type NonNullable<T> = T extends null | undefined ? never : T;
type NonNullableRes = NonNullable<null>;

type NonNullableRes2 = NonNullable<{ name: "guang" }>;
/**
 * 
    type Uppercase<S extends string> = intrinsic;

    type Lowercase<S extends string> = intrinsic;

    type Capitalize<S extends string> = intrinsic;

    type Uncapitalize<S extends string> = intrinsic;

 */

type UppercaseRes = Uppercase<"aaaa">;

type LowercaseRes = Lowercase<"AAA">;

type CapitalizeRes = Capitalize<"aaa">;

type UncapitalizeRes = Uncapitalize<"Aaa">;
