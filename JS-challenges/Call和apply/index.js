//1.间谍装饰器
function spy(func) {
  function wrapper(...args) {
    // using ...args instead of arguments to store "real" array in wrapper.calls
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = []; //记录每次调用的参数

  return wrapper;
}
function sum(a, b) {
  console.log(a + b);
}
// const sum2 = spy(sum);
// sum2(1, 2);
// sum2(2, 2);
// sum2(3, 2);
// sum2(4, 2);

// console.log(sum2.calls);

//2.延时装饰器
/**
 * 作用是将f的调用延时ms毫秒
 * @param {func} f
 * @param {毫秒} ms
 */
function delay(f, ms) {
  function wrapper(...args) {
    console.log(this);
    setTimeout(() => f.apply(this, args), ms);
  }
  return wrapper;
}
// let f1000 = delay(sum, 1000);
// f1000(1, 2);

//3.防抖装饰器
function debounce(f, ms) {
  let timerId = null;
  function wrapper(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      f.apply(this, args);
    }, ms);
  }
  return wrapper;
}
function debounce2(func, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}
const obj = {
  value: 42,
  logValue() {
    console.log(this.value);
  },
};

// const debouncedLogValue = debounce(obj.logValue, 1000);

// obj.logValue(); // 立即输出 42
// debouncedLogValue.call(obj); // 1 秒后输出 42

//4.节流包装器
//节流是每隔一段时间执行一次，但是可能时间还没到就调用了函数好几次
//，那么中间状态可能会被忽略，所以要记录每次调用的参数
function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;
    func.apply(this, arguments);

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

function f(a) {
  console.log(a);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function testThrottle() {
  let f1000 = throttle(f, 1000);

  f1000(1); // 显示 1
  f1000(2); // (节流，尚未到 1000ms)
  f1000(3); // (节流，尚未到 1000ms)

  await sleep(5000); // 休眠5秒，不阻塞事件循环
  f1000(8); // 显示 8
  f1000(10); // (节流，尚未到 1000ms)
}

// testThrottle();
const user = {};
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
console.log(user);
console.log(Object.getOwnPropertyDescriptors(user));
const copy = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(user)
);
console.log(Object.getOwnPropertyDescriptors(copy));
