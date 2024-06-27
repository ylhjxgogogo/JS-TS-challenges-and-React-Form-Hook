import { never, number } from "zod";

// Camelcase
type Camelcase<Str extends string> =
  Str extends `${infer Left}_${infer last}${infer Right}`
    ? `${Left}${Uppercase<last>}${Camelcase<Right>}`
    : Str;

type CamelcaseResult = Camelcase<"aa_aa_aa">;

type CamelcaseArr<Arr extends unknown[]> = Arr extends [
  infer First,
  ...infer Rest
]
  ? [Camelcase<First & string>, ...CamelcaseArr<Rest>]
  : Arr;
type CamelcaseArrResult = CamelcaseArr<["aa_aa_aa", "bb_bb_bb", "cc_cc_cc"]>;

type CamelcaseUnion<Item extends string> =
  Item extends `${infer Left}_${infer last}${infer Right}`
    ? `${Left}${Uppercase<last>}${CamelcaseUnion<Right>}`
    : Item;
type CamelcaseUnionResult = CamelcaseUnion<
  "aa_aa_aa" | "bb_bb_bb" | "cc_cc_cc"
>;

// IsUnion
//用B保存一份A,在利用A extends A ，触发分布式计算
//再用[B]和[A]方括号把触发后的值保存起来，如果A是联合类型，那么后续
//[B]肯定不会和[A]相等，因为此时A已经不是完整的联合类型了

/**
 * 当 A 是联合类型时：

A extends A 这种写法是为了触发分布式条件类型，让每个类型单独传入处理的，没别的意义。

A extends A 和 [A] extends [A] 是不同的处理，前者是单个类型和整个类型做判断，
后者两边都是整个联合类型，
因为只有 extends 左边直接是类型参数才会触发分布式条件类型。
 */

type IsUnion<A, B = A> = A extends A
  ? [B] extends [A]
    ? false
    : true //["a" | "b" | "c"] extends ["a"]
  : never;

type IsUnionResult = IsUnion<"a" | "b" | "c" | "d">;

type IsUnionResult2 = IsUnion<["a" | "b" | "c"]>;

// TestUnion
type TestUnion<A, B = A> = A extends A ? { a: A; b: B } : never;

type TestUnionResult = TestUnion<"a" | "b" | "c">;

// BEM block__element--modifier 的形式来描述某个区块下面的某个元素的某个状态的样式。
type BEM<
  Block extends string,
  Element extends string[],
  Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`;

type union2 = ["aaa", "bbb"][number]; //"aaa"|"bbb"

type bemResult = BEM<"guang", ["aaa", "bbb"], ["warning", "success"]>;

// AllCombinations  返回'A' | 'B' | 'BA' | 'AB'。
/**
 * 当extends关键字左侧是泛型且传入的是联合类型时，它可以实现分配效果，即对联合类型中的每个类型分别进行处理。
 * 如果左侧不是泛型，直接是一个联合类型，
 * 那么extends只是进行简单的条件判断，没有分配效果。”
 */
type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;

type AllCombinations<A extends string, B extends string = A> = A extends A
  ? Combination<A, AllCombinations<Exclude<B, A>>>
  : never;

type AllCombinationsResult = AllCombinations<"A" | "B" | "C">;
export {};
