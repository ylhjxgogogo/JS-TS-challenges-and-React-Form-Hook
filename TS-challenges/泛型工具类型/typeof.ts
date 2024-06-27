//typeof
interface Person {
  name: string;
  age: number;
}

const sem: Person = { name: "semlinker", age: 30 };
type Sem = typeof sem; // -> Person

function toArray(x: number): Array<number> {
  return [x];
}

type Func = typeof toArray; // -> (x: number) => number[]
