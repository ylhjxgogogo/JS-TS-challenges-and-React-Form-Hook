const arr = [1, [2, 3, [4, 5]], 1, 2, [6, 7, [4, 56, [5, 67, [3, 4, [5, 7]]]]]];

function flat(arr, level = 1) {
  level === "Infinity" ? level : level--;
  let newArr = [];
  arr.forEach((item) => {
    if (!Array.isArray(item)) {
      //该项不是数组，直接push进去
      newArr.push(item);
    } else {
      //item这项是数组
      if (level >= 0) {
        newArr = newArr.concat(flat(item, level));
      } else {
        newArr.push(item);
      }
    }
  });
  return newArr;
}
const arr2 = flat(arr);
console.log(arr2);
