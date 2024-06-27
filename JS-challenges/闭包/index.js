function sum(a) {
  return function sum2(b) {
    return a + b;
  };
}
//   console.log(sum(1)(2));
let arr = [1, 2, 3, 4, 5, 6, 7];
//返回a到b之间的数
function inBetween(a, b) {
  return function (n) {
    return n >= a && n <= b;
  };
}
function inArray(arr) {
  return function (n) {
    return arr.find((item) => item === n);
  };
}
const filterList = arr.filter(inBetween(3, 6));
const inArr = arr.filter(inArray([1, 2, 10]));
// console.log(filterList);
// console.log(inArr);
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" },
];
//按字段排序
function byFileld(key) {
  return function (a, b) {
    return a[key] > b[key] ? 1 : -1;
  };
}
// users.sort(byFileld("name"));
// console.log(users);
// users.sort(byFileld("age"));
// console.log(users);
function makeCounter() {
  let count = 0;

  function counter() {
    return count++;
  }

  counter.set = (value) => (count = value);

  counter.decrease = () => --count;
  return counter;
}
// console.log(counter());
// console.log(counter());
// console.log(counter2());
// console.log(counter.set(10));
// console.log(counter.decrease());

//任意数量的括号求和
function sumAll(a) {
  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function () {
    return currentSum;
  }; //当用户要进行计算时，会转换成原始值调用该方法返回

  return f; //首次返回
}
console.log(sumAll(1)(2) == 3);
function test(a, ...rest) {
  console.log(rest);
}
test(1, 2, 3, 4, 5);
const test2 = new Function("a", "b", "return a+b");
console.log(test2(1, 2));
