/**
 *与 Promise.all 类似，
 但只等待第一个 settled 的 promise 并获取其结果（或 error）。
 */
//1.判断参数是否是可迭代对象
function isIterable(obj) {
  return (
    obj !== undefined &&
    obj !== null &&
    typeof obj[Symbol.iterator] === "function"
  );
}
function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!isIterable(promises)) {
      return reject(new TypeError("参数必须是可迭代对象"));
    }
    Array.from(promises).forEach((promise) => {
      Promise.resolve(promise)
        .then((value) => {
          return resolve(value);
        })
        .catch((err) => reject(err));
    });
  });
}
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "two");
});

myPromiseRace([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// Expected output: "two"
