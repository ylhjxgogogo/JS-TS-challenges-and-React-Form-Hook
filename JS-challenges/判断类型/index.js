function getProperty(obj) {
  const string = Object.prototype.toString.call(obj);
  let regexp = /\[object (\w+)\]/; // 注意这里的空格 [ ] 都需要使用转义字符 \
  const match = string.match(regexp);
  if (match) {
    console.log(match);
    return match[1]; //第一个返回原字符串，第二个返回匹配到的字符串
  } else {
    throw new Error("什么都没有匹配到"); // 抛出错误
  }
}

const arr = [1, 2];
const regexp = new RegExp();
console.log(getProperty(regexp)); // "Array"
