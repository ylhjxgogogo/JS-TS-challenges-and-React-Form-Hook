// IsAny 就看传进来的T能不能当成顶层类型用，能就是any

import { NotEqual } from "@type-challenges/utils";
import { unknown } from "zod";

//any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any。
type IsAny<T> = 'lll' extends 'ggg'&T?true:false
//这里的'hhh'和'jjj'只要是不一样的类型就可以
type IsAnyResult = IsAny<any>;
type IsAnyResult2 = IsAny<never>;
//最底层和最顶层都是any
type test=never&any; //never
type test2=never|any; //any
type IsAnyResult2 = IsAny<'guang'>;

// IsEqual 严格判等
type IsEqual<A, B> =(<T>()=>T extends A?1:2)extends(<T>()=>T extends B?1:2)
? true
: false
type test=any extends 'a'?true:false //boolean
type IsEqualRes = IsEqual<'a', any>; //false
type IsEqualRes2 = IsEqual<boolean, false>;//false
type ghs=boolean extends boolean ?true:false //true


// IsUnion  boolean 是联合类型
type IsUnion<A, B = A> =A extends A
?[B] extends [A]
    ?false
    :true
:never
type IsUnionResult = IsUnion<'A' | 'B'>;
type IsUnionResult2 = IsUnion<'A'>;
type IsUnionResult3 = IsUnion<boolean>;
type IsUnionResult4 = IsUnion<1|any>;

//IsNever
type IsNever<T> =[T] extends [never]?true:false
//下面这种写法遇到左边是never，直接就返回never了，而不是true/false
// type IsNever<T> =T extends never?true:false;//never

type IsNeverResult = IsNever<never>;
type IsNeverResult2 = IsNever<any>;

type TestAny<T> =T extends number?1:2//左边是any，永远返回联合类型

type TestAnyRes = TestAny<any>;//1|2

//IsTuple 元组类型的 length 是数字字面量，而数组的 length 是 number。
type len = [1,2,3]['length']; //2

type len2 = number[]['length'] //number

type IsTuple<T> =T extends [...args:infer Arr]
?NotEqual<Arr["length"],number>
:never

//判断数字字面量类型和number类型是不是相等的

type NotEqual<A, B> =(<T>()=>T extends A?1:2) extends (<T>()=>T extends B?1:2)
? false
: true
type IsTupleResult = IsTuple<[1, 2, 3]>;

type IsTupleResult2 = IsTuple<number[]>;

//UnionToIntersection 联合类型转交叉类型 即父类型赋值给子类型
//称为逆变
//在 TypeScript 中有函数参数是有逆变的性质的，
//也就是如果参数可能是多个类型，参数类型会变成它们的交叉类型。
type UnionToIntersection<U> = (U extends U?(arg:U)=>unknown:never)extends (arg:infer Arg)=>unknown
    ? Arg
    :never
   
type UnionToIntersectionResult=UnionToIntersection<{guang:1}|{dong:2}>
//GetOptional 得到可选属性
//{}是除unknown、any的顶级对象，{} extends {}，只有可选属性才有机会为空
//pick是从指定对象中挑出索引，只有是可选对象，{}才能extends给它
type GetOptional<Obj extends  Record<string, any>> =

type GetOptionalResult = GetOptional<{
  name: string;
  age?: number;
}>;

//GetRequired
////{}是除unknown、any的顶级对象，{} extends {}，只有可选属性才有机会为空
//反过来，{} 不能 extends 的只有必选属性了
type isRequired<Key extends keyof Obj, Obj> =  {} extends Pick<Obj,Key>?never:Key
  
type GetRequired<Obj extends Record<string, any>> = {
    [k in keyof Obj as isRequired<k,Obj>]:Obj[k]
}

type GetRequiredResult = GetRequired<{
  name: string;
  age?: number;
}>;

//RemoveIndexSignature 
/**
 * 移除索引签名
 * type Dong = {
  [key: string]: any; //代表可以添加任意多个string类型的索引
  sleep(): void;
  索引签名不能构造成字符串字面量类型，因为它没有名字，而其他索引可以。
}

 */
type RemoveIndexSignature<Obj extends Record<string, any>> = {
    [k in keyof Obj as k extends `${infer Str}`?k:never]:Obj[k]
}

type RemoveIndexSignatureResult = RemoveIndexSignature<{
  [key: string]: any;
  sleep(): void;
  name:string
}>;
//ClassPublicProps
/**
 * keyof 只能拿到 class 的 public 索引，private 和 protected 的索引会被忽略。
 */
class Dong {
  public name: string;
  protected age: number;
  private hobbies: string[];

  constructor() {
    this.name = 'dong';
    this.age = 20;
    this.hobbies = ['sleep', 'eat'];
  }
}

type ClassPublicPropsResult = ClassPublicProps<Dong>;


type ClassPublicProps<Obj extends Record<string, any>> = {
    [k in keyof Obj]:Obj[k]
}

// as const
const obj = {
    a: 1,
    b: 2
}

type objType = typeof obj;//{a:number,b:number}

const arr = [1, 2, 3]

type arrType = typeof arr; //number[]

const obj2 = {
    a: 1,
    b: 2
} as const; //{readonly a:'1'}


type objType2 = typeof obj2; //推导出只读的字面量类型

const arr2 = [1, 2, 3] as const;


type arrType2 = typeof arr2;


type ReverseArr<Arr> = Arr extends readonly[infer First,...infer Rest]
?[...ReverseArr<Rest>,First]
:[]
type ReverseArrRes = ReverseArr<arrType2>;
type xxx=1 | any extends 1 ? true : false
export{}