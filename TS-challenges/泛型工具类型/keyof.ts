interface Person {
  name: string;
  age: number;
}

type K1 = keyof Person; // "name" | "age"
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join"
type K3 = keyof { [x: string]: Person }; // string | number
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// 示例
type ExpandedK1 = Expand<keyof Person>; // 会显示 "name" | "age"
type ExpandedK2 = Expand<keyof Person[]>; // 会显示数组方法的联合类型
type ExpandedK3 = Expand<keyof { [x: string]: Person }>; // 会显示 "string" | "number"
