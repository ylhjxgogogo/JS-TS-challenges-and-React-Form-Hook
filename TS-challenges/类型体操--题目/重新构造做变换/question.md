// 数组：

// Push
type Push<Arr extends  unknown[], Ele> = 

type PushResult = Push<[1, 2, 3], 4>;

// Unshift
type Unshift<Arr extends  unknown[], Ele> = 

type UnshiftResult = Unshift<[1, 2, 3], 0>;

// Zip
type Zip<One extends [unknown, unknown], Other extends [unknown, unknown]> = 
  

                
type ZipResult = Zip<[1,2], ['guang', 'dong']>;

// Zip2
type Zip2<One extends unknown[], Other extends unknown[]> = 
   
type Zip2Result = Zip2<[1,2,3,4,5], ['guang', 'dong', 'is', 'best', 'friend']>;

// 字符串：

// CapitalizeStr
type CapitalizeStr<Str extends string> = 

type CapitalizeResult = CapitalizeStr<'guang'>;

// CamelCase
type CamelCase<Str extends string> = 
  

type CamelCaseResult = CamelCase<'dong_dong_dong'>;

// DropSubStr
type DropSubStr<Str extends string, SubStr extends string> = 
   

type DropResult = DropSubStr<'dong~~~', '~'>;

// 函数

// AppendArgument
type AppendArgument<Func extends Function, Arg> = 
   

type AppendArgumentResult  = AppendArgument<(name: string) => boolean, number>;

// 索引类型

// Mapping
type Mapping<Obj extends object> = 

type res = Mapping<{ a: 1, b: 2}>;

// UppercaseKey
type UppercaseKey<Obj extends object> = 

type UppercaseKeyResult = UppercaseKey<{ guang: 1, dong: 2}>;

// ToReadonly
type ToReadonly<T> =  

type ReadonlyResult = ToReadonly<{
    name: string;
    age: number;
}>;

// ToPartial
type ToPartial<T> = 

type PartialResult = ToPartial<{
    name: string;
    age: number;
}>;

// ToMutable
type ToMutable<T> = 

type MutableResult =  ToMutable<{
    readonly name: string;
    age: number;
}>;

// ToRequired
type ToRequired<T> = 

type RequiredResullt = ToRequired<{
    name?: string;
    age: number;
}>;

// FilterByValueType
type FilterByValueType<Obj extends Record<string, any>, ValueType> = 

interface Person {
    name: string;
    age: number;
    hobby: string[];
}

type FilterResult = FilterByValueType<Person, string | number>;