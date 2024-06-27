//promise.all 类型声明
interface PromiseConstructor {
  //all是一个参数为可迭代数组，返回值也会一个promise值的数组
  all<T extends readonly unknown[] | []>(
    values: T
  ): Promise<{
    -readonly [P in keyof T]: Awaited<T[P]>;
  }>;
  race<T extends readonly unknown[] | []>(
    values: T
  ): Promise<Awaited<T[number]>>;
}
