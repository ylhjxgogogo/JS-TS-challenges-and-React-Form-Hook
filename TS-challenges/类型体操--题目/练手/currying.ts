type CurriedFunc<Params, Return> = Params extends [infer Arg, ...infer Rest]
  ? (arg: Arg) => CurriedFunc<Rest, Return>
  : Return;
const func = (a: string, b: number, c: boolean) => {
  return 3;
};
declare function currying<Func>(
  fn: Func
): Func extends (...args: infer Params) => infer Result
  ? CurriedFunc<Params, Result>
  : never;
const curriedFunc = currying(func);
type b = keyof [1, 2, 3];
