//1.求和
function sumTo(n) {
  return n === 1 ? n : n + sumTo(n - 1);
}
// console.log(sumTo(100)); //5050

//2.计算阶乘
function factorial(n) {
  return n === 2 ? 2 : n * factorial(n - 1);
}
// console.log(factorial(5));

//3.计算斐波那契数
function fib(n, map = new Map()) {
  if (map.has(n)) {
    return map.get(n);
  }
  if (n === 1 || n === 2) {
    return 1;
  }
  // 递归计算并缓存结果
  const result = fib(n - 1, map) + fib(n - 2, map);
  map.set(n, result);

  return result;
}
//4.输出一个单链表
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};
function printList(list) {
  //   console.log(list.value);
  //   if (list.next) {
  //     printList(list.next);
  //   }
  let temp = list;
  while (temp) {
    console.log(temp.value);
    temp = temp.next;
  }
}
// printList(list);
//5.反转输出链表
// function reverseList(list) {
//   //1.循环
//   let temp = list;
//   let listArr = [];
//   while (temp) {
//     listArr.push(temp.value);
//     temp = temp.next;
//   }
//   listArr.reverse().forEach((item) => console.log(item));
// }
function reverseList2(list) {
  //1.递归
  if (list.next) {
    reverseList2(list.next);
  }
  console.log(list.value);
}
// reverseList2(list);
