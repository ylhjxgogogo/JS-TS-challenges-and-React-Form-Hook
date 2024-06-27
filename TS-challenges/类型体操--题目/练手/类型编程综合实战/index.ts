/**
 * KebabCaseToCamelCase
 * 一种是 KebabCase，也就是 aaa-bbb-ccc 这种中划线分割的风格。
 * 另一种是 CamelCase， 也就是 aaaBbbCcc 这种除第一个单词外首字母大写的风格。
 */
type KebabCaseToCamelCase<T extends string> =
  T extends `${infer First}-${infer Last}${infer Rest}`
    ? `${First}${Uppercase<Last>}${KebabCaseToCamelCase<Rest>}`
    : T;

type KebabCaseToCamelCaseRes = KebabCaseToCamelCase<"aaa-bbb-ccc">; // "aaaBbbCcc"

/**
 * CamelCaseToKebabCase
 * aaaBbbCcc->aaa-bbb-ccc
 */
type CamelCaseToKebabCase<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? First extends Uppercase<First>
      ? `_${Lowercase<First>}${CamelCaseToKebabCase<Rest>}`
      : `${First}${CamelCaseToKebabCase<Rest>}`
    : T;
type CamelCaseToKebabCaseRes = CamelCaseToKebabCase<"aaaBbbCcc">;

/**
 * Chunk
 * 希望实现这样一个类型：
  对数组做分组，比如 1、2、3、4、5 的数组，每两个为 1 组，那就可以分为 1、2 和 3、4 以及 5 这三个 Chunk。
 */
type Chunk<
  Arr extends unknown[],
  Len extends number,
  CurItem extends unknown[] = [],
  Res extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? CurItem["length"] extends Len
    ? Chunk<Rest, Len, [First], [...Res, CurItem]>
    : Chunk<Rest, Len, [...CurItem, First], Res>
  : [...Res, CurItem];
type ChunkRes = Chunk<[1, 2, 3, 4, 5], 4>;

/**
 * TupleToNestedObject 传入元组类型[‘a’, ‘b’, ‘c’]和值 xxx，生成下面的对象
 * {
 *  a:{
 *    b:{
 *      c:xxx
 *      }
 *    }
 * }
 */
type TupleToNestedObject<Tuple extends unknown[], Value> = Tuple extends [
  infer First,
  ...infer Rest
]
  ? {
      [k in First as k extends keyof any ? k : never]: Rest extends unknown[]
        ? TupleToNestedObject<Rest, Value>
        : Value;
    }
  : Value;
// type TupleToNestedObjectRes = TupleToNestedObject<["a", "b", "c", string], 1>;
export {};
