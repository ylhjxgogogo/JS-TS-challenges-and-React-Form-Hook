import { Equal } from "@type-challenges/utils";

// type Includes<T extends readonly any[], U> = U extends T[number]?true:false;

//递归的思想
export type Includes<T extends readonly unknown[], U> = T extends [
  infer First,
  ...infer Rest
]
  ? Equal<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false;
let str1 = "hello TS";
const str2 = "hello TS";
