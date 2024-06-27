//mapping
type Mapp<List> = List extends [infer First, ...infer Rest]
  ? [{ name: First }, ...Mapp<Rest>]
  : [];
type a = Mapp<[1, 2, 3, 5, 6]>;

//filter,只取number类型的数据
type Filter<List, T> = List extends [infer First, ...infer Rest]
  ? First extends T
    ? [First, ...Filter<Rest, T>]
    : Filter<Rest, T>
  : [];

type b = Filter<[1, 2, "1"], string>;

//Take[Tuple,N,Output] 传入元组，和输出的数量

type Take<Tuple, N, Output extends unknown[] = []> = Tuple extends [
  infer First,
  ...infer Rest
]
  ? Output["length"] extends N
    ? Output
    : Take<Rest, N, [...Output, First]>
  : Output;
//Output["length"] extends N 只有到达N才为true
type h = Take<[1, 2, 3, 4], 1>;
type c = 5 extends 5 ? true : false;
type d = [1, "2"]["length"];
