function deepClone(origin) {
  const map = new WeakMap();

  function clone(obj) {
    // 处理 null 和基本数据类型
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    // 处理特殊对象类型
    const constructor = obj.constructor;
    ///^(Date|Function|RegExp|Set|Map)$/i后面的i表示不区分大小写
    if (/^(Date|Function|RegExp|Set|Map)$/i.test(constructor.name)) {
      return new constructor(obj);
    }

    // 防止循环引用
    if (map.has(obj)) {
      return map.get(obj);
    }

    // 处理数组和对象
    let result = Array.isArray(obj) ? [] : {};
    map.set(obj, result); //1,马上记录，方便后续处理都能解决循环引用
    // 处理数组
    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        result.push(clone(item));
      });
    } else {
      // 处理对象
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          result[key] = clone(obj[key]);
        }
      }
    }
    return result;
  }

  return clone(origin);
}
const obj = {
  name: "听风",
  age: 29,
  other: {
    gender: "male",
    arr: [1, 2, 3],
  },
};
obj.obj = obj; //循环引用

const obj2 = deepClone(obj);
console.log(obj2);
