//负责把 'a=2'变成{a:'1'}
type ParseStringToObj<Str extends string> =
  Str extends `${infer Key}=${infer Value}`
    ? {
        [K in Key]: Value;
      }
    : ;
type res1 = ParseStringToObj<"a=1">; //{a:"1"}

/**
 * 负责将两个对象合并成一个对象
 * obj1={a:'1'} obj2={b:'2'}
 * 合并成{a:'1',b:'2'}
 */
type MergeParamsToObj<
  ParamObj1 extends Record<string, any>,
  ParamObj2 extends Record<string, any>
> = {
  //[k in a|b]
  [k in keyof ParamObj1 | keyof ParamObj2]: k extends keyof ParamObj1
    ? k extends keyof ParamObj2
      ? [ParamObj1[k], ParamObj2[k]]
      : ParamObj1[k]
    : k extends keyof ParamObj2
    ? ParamObj2[k]
    : never;
};
type MergeResult = MergeParamsToObj<{ a: "1"; c: "4" }, { b: "2"; a: "3" }>; //ok
 type ParseQueryString<Str extends string> =
    Str extends `${infer Param}&${infer Rest}`
      ? MergeParamsToObj<ParseStringToObj<Param>, ParseQueryString<Rest>>
      : ParseStringToObj<Str>;
type res2 = ParseQueryString<`a=1&b=2&c=3`>;

export{}