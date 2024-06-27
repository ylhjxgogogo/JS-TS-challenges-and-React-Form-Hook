// 数组：

// Push
type Push<Arr extends unknown[], Ele> = [...Arr, Ele];

type PushResult = Push<[1, 2, 3], 4>;

// Unshift
type Unshift<Arr extends unknown[], Ele> = [Ele, ...Arr];

type UnshiftResult = Unshift<[1, 2, 3], 0>;

// Zip
type Zip<
  One extends [unknown, unknown],
  Other extends [unknown, unknown]
> = One extends [infer oneFirst, infer oneSecond]
  ? Other extends [infer twoFirst, infer twoSecond]
    ? [[oneFirst, twoFirst], [oneSecond, twoSecond]]
    : []
  : [];

type ZipResult = Zip<[1, 2], ["guang", "dong"]>;

// Zip2
type Zip2<One extends unknown[], Other extends unknown[]> = One extends [
  infer First,
  ...infer Rest1
]
  ? Other extends [infer Second, ...infer Rest2]
    ? [[First, Second], ...Zip2<Rest1, Rest2>]
    : []
  : [];
type Zip2Result = Zip2<
  [1, 2, 3, 4, 5],
  ["guang", "dong", "is", "best", "friend"]
>;

// 字符串：

// CapitalizeStr 首字母大写
type CapitalizeStr<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : Str;

type CapitalizeResult = CapitalizeStr<"guang">;

// CamelCase
type CamelCase<Str extends string> =
  Str extends `${infer First}_${infer last}${infer Rest}`
    ? `${First}${Uppercase<last>}${CamelCase<Rest>}`
    : Str;

type CamelCaseResult = CamelCase<"dong_dong_dong">;

// DropSubStr
type DropSubStr<
  Str extends string,
  SubStr extends string
> = Str extends `${infer First}${SubStr}${infer Rest}`
  ? DropSubStr<`${First}${Rest}`, SubStr>
  : Str;
type DropResult = DropSubStr<"don~~~~g~~~", "~">;

// 函数

// AppendArgument
type AppendArgument<Func extends Function, Arg> = Func extends (
  ...arg: infer Args
) => infer ReturnType
  ? (...arg: [...Args, Arg]) => ReturnType
  : never;

type AppendArgumentResult = AppendArgument<(name: string) => boolean, number>;

// 索引类型

// Mapping a:[1,1,1]
type Mapping<Obj extends object> = {
  [k in keyof Obj]: [Obj[k], Obj[k], Obj[k]];
};

type res = Mapping<{ a: 1; b: 2 }>;

// UppercaseKey 将key首字母大写
type UppercaseKey<Obj extends object> = {
  [k in keyof Obj as k extends `${infer First}${infer Rest}`
    ? `${Uppercase<First & string>}${Rest}`
    : k]: Obj[k];
};

type UppercaseKeyResult = UppercaseKey<{ Guang: 1; dong: 2 }>;

// ToReadonly
type ToReadonly<T> = {
  readonly [k in keyof T]: T[k];
};

type ReadonlyResult = ToReadonly<{
  name: string;
  age: number;
}>;

// ToPartial
type ToPartial<T> = {
  [k in keyof T]?: T[k];
};

type PartialResult = ToPartial<{
  name: string;
  age: number;
}>;

// ToMutable 去掉readonly
type ToMutable<T> = {
  -readonly [k in keyof T]: T[k];
};

type MutableResult = ToMutable<{
  readonly name: string;
  age: number;
}>;

// ToRequired 去掉可选
type ToRequired<T> = {
  [k in keyof T]-?: T[k];
};

type RequiredResullt = ToRequired<{
  name?: string;
  age: number;
}>;

// FilterByValueType
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [k in keyof Obj as Obj[k] extends ValueType ? k : never]: Obj[k];
};

interface Person {
  name: string;
  age: number;
  hobby: string[];
}

type FilterResult = FilterByValueType<Person, string | number>;
type jjj = boolean extends false ? true : false;
type kkkk = false | true;
type jjfj = kkkk extends false ? true : false;
