/**
 * 明确概念：
 * promise.all接收一个可迭代对象；我们把它包装成一个promise数组
 * 当对象里的promise最终全是resolve时：
 *      promise.all最终返回一个结果数组，顺序和传入的数组顺序一样；
 * 只要有一个reject，由 Promise.all 返回的 promise 就会立即 reject，并且带有的就是这个 error。
 */

//1.判断一个参数是否是可迭代对象？
function isIterable(obj) {
  return (
    obj !== undefined &&
    obj != null &&
    typeof obj[Symbol.iterator] === "function"
  );
}
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!isIterable(promises)) {
      return reject(new TypeError("传参错误：参数必须是一个可迭代对象"));
    }
    let count = promises.length;
    let completedPromise = 0;
    let result = [];
    if (count === 0) resolve(result);
    //将传入的可迭代对象包装成promise
    Array.from(promises).forEach((promise, index) => {
      // 将 promise 转换成一个真实的 Promise 实例，以便它能正确处理
      Promise.resolve(promise)
        .then((value) => {
          result[index] = value;
          completedPromise += 1;
          if (completedPromise === count) {
            //说明全部完成了
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
let names = ["iliakan", "remy", "jeresig"];

let requests = names.map((name) =>
  fetch(`https://api.github.com/users/${name}`)
);

myPromiseAll(requests)
  .then((responses) => {
    // 所有响应都被成功 resolved
    for (let response of responses) {
      console.log(`${response.url}: ${response.status}`); // 对应每个 url 都显示 200
    }

    return responses;
  })
  // 将响应数组映射（map）到 response.json() 数组中以读取它们的内容
  .then((responses) => myPromiseAll(responses.map((r) => r.json())))
  // 所有 JSON 结果都被解析："users" 是它们的数组
  .then((users) => users.forEach((user) => console.log(user.name)));
myPromiseAll([]).then((value) => console.log("my---", value));
console.log("-----");
Promise.all([]).then((value) => console.log("teacher--", value));
myPromiseAll({}).catch((err) => console.log(err));
