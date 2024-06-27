/**
与 Promise.race 类似，
区别在于 Promise.any 只等待第一个 fulfilled 的 promise，
并将这个 fulfilled 的 promise 返回。
如果给出的 promise 都 rejected，
那么返回的 promise 会带有 AggregateError —— 一个特殊的 error 对象
，在其 errors 属性中存储着所有 promise error。
 */
//1.判断参数是否是可迭代对象
function isIterable(obj) {
  return (
    obj !== undefined &&
    obj !== null &&
    typeof obj[Symbol.iterator] === "function"
  );
}
function myPromiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (!isIterable(promises)) {
      return reject(new TypeError("参数必须是可迭代对象"));
    }
    let count = promises.length;
    let completedPromise = 0;
    let errors = [];
    if (count === 0) {
      // 如果传入的数组为空，则立即 reject
      return reject(new AggregateError([], "All promises were rejected"));
    }
    Array.from(promises).forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          return resolve(value);
        })
        .catch((err) => {
          //走的是reject
          completedPromise += 1;
          errors[index] = err;
          if (completedPromise === count) {
            //如果走到了这一步，说明promise没有一个是fulfilled，则抛出 AggregateError
            reject(new AggregateError(errors));
          }
        });
    });
  });
}
myPromiseAny([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Ouch!")), 1000)
  ),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Error!")), 2000)
  ),
]).catch((error) => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
