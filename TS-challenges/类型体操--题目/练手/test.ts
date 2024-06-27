//负责把 'a=2'变成{a:'1'}
type ParseStringToObj<Str extends string> =
  Str extends `${infer Key}=${infer Value}`
    ? { [k in Key]: Value }
    : Record<string, any>;

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
  [k in keyof ParamObj1 | keyof ParamObj2]: k extends keyof ParamObj1
    ? k extends keyof ParamObj2
      ? [ParamObj1[k], ParamObj2[k]]
      : ParamObj1[k]
    : k extends keyof ParamObj2
    ? ParamObj2[k]
    : never;
};
type MergeResult = MergeParamsToObj<{ a: "1"; b: "2" }, { a: "3"; c: "4" }>; //ok
//First=`a=1` Rest=`b=2&c=3&a=3`
type ParseQueryString<Str extends string> =
  Str extends `${infer Param}&${infer Rest}`
    ? MergeParamsToObj<ParseStringToObj<Param>, ParseQueryString<Rest>>
    : ParseStringToObj<Str>;
type res2 = ParseQueryString<`a=1&b=2&c=3&a=3`>;
type res3 = ParseQueryString<string>;

//实际应用
//声明函数类型
function parseQueryString<Str extends string>(
  queryStr: Str
): ParseQueryString<Str>;
//实现函数
function parseQueryString(queryStr: string) {
  if (!queryStr || !queryStr.length) {
    return {};
  }
  const queryObj: Record<string, any> = {};
  const items = queryStr.split("&");
  items.forEach((item) => {
    const [key, value] = item.split("=");
    if (queryObj[key]) {
      if (Array.isArray(queryObj[key])) {
        queryObj[key].push(value);
      } else {
        queryObj[key] = [queryObj[key], value];
      }
    } else {
      queryObj[key] = value;
    }
  });
  return queryObj;
}
const res = parseQueryString("a=1&b=2&c=3&a=3&a=8");
console.log(res);
export {};
