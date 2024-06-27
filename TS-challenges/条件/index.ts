//1.判断输入是不是数组
type isArray<T> = T extends unknown[] ? true : false;
type a = isArray<[1, "2", { name: "hhh" }]>; //true
type b = isArray<123>; //false

//2.判断一个key是否在对象上面,是就返回它的值，否则 undefined
type GetProp<Obj, key extends string> = key extends keyof Obj
  ? Obj[key]
  : undefined;
type value = GetProp<{ name: string; age: number }, "age">; //number
