let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
//map,保留了顺序
function aclean(arr) {
  const map = new Map();
  for (const item of arr) {
    const sortItem = item.toLowerCase().split("").sort().join("");
    if (map.has(sortItem)) continue;
    map.set(sortItem, item);
  }
  return Array.from(map.values());
}
//使用原始对象，它会被后面的值覆盖，所以找到的都是靠后的值
function aclean2(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr2 = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log(aclean2(arr2));
