/**
 * 其他都和promise.all一致，但是不一样的地方在于遇到reject的情况也不要直接reject
 * 成不成功都要保留结果，只是结果格式有区分
 * {status:"fulfilled", value:result} 对于成功的响应，
   {status:"rejected", reason:error} 对于 error。
 */
//1.判断参数是否是可迭代对象
function isIterable(obj) {
  return (
    obj !== undefined &&
    obj !== null &&
    typeof obj[Symbol.iterator] === "function"
  );
}

function MyPromiseSettled(promises) {
  return new Promise((resolve, reject) => {
    if (!isIterable(promises)) {
      return reject(new TypeError("参数必须是可迭代对象"));
    }
    const newPromises = Array.from(promises).map((promise) => {
      return Promise.resolve(promise)
        .then((value) => {
          return { status: "fulfilled", value: value };
        })
        .catch((err) => {
          return { status: "rejected", reason: err };
        });
    });

    Promise.all(newPromises).then(resolve).catch(reject);
  });
}

let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://no-such-url",
];

MyPromiseSettled(urls.map((url) => fetch(url))).then((results) => {
  console.log(results);
  results.forEach((result, num) => {
    if (result.status == "fulfilled") {
      console.log(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status == "rejected") {
      console.log(`${urls[num]}: ${result.reason}`);
    }
  });
});
