//1.基于promise的延时
function delay(ms) {
  // 你的代码
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

// delay(3000).then(() => console.log("runs after 3 seconds"));
new Promise(function (resolve, reject) {
  throw new Error("Whoops!"); //同步的错误try...catch捕捉到，并自动将其变为rejection
}).catch((err) => console.log(err.message));

new Promise(function (resolve, reject) {
  resolve("ok"); //同步的错误try...catch捕捉到
})
  .then((value) => {
    throw new Error("Whoops222!");
  })
  .catch((err) => console.log(err.message));
// new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     throw new Error("Whoops333!");
//   }, 1000); //异步的错误try...catch捕捉不到，必须显式rejection
// }).catch((err) => console.log(err.message));
new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject(new Error("Whoops333!"));
  }, 1000); //异步的错误try...catch捕捉不到，必须显式rejection
}).catch((err) => console.log(err.message));
const promise1 = Promise.resolve(42);
const promise2 = Promise.reject("Error");
const promiseArr = [promise1, promise2].map((promise) => {
  console.log(promise);
  return Promise.resolve(promise)
    .then((value) => {
      return { status: "fulfilled", value };
    })
    .catch((reason) => {
      return { status: "rejected", reason };
    });
});

console.log(promiseArr);
Promise.all(promiseArr).then((result) => {
  console.log("allseltted---", result);
});
const res = Promise.all([promise1, promise2])
  .then((result) => {
    console.log("all---", result);
  })
  .catch((err) => console.log(err.message));
console.log(res);
async function loadJson(url) {
  try {
    const response = await fetch(url); //head接收完毕，then得到执行拿到了response;
    if (response.status == 200) {
      return response.json();
    }
  } catch (error) {
    throw new Error(response.status);
  }
}

// loadJson("https://javascript.info/no-such-user.json").catch(alert); // Error: 404
function f() {
  try {
    console.log("start");
    return "result";
  } catch (err) {
    /// ...
  } finally {
    console.log("cleanup!");
  }
}

f(); // cleanup!
