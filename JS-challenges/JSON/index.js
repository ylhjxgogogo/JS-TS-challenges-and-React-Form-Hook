let room = {
  number: 23,
};

let meetup = {
  title: "Conference",
  occupiedBy: [{ name: "John" }, { name: "Alice" }],
  place: room,
  date: new Date(),
};

// 循环引用
room.occupiedBy = meetup;
meetup.self = meetup;
//处理循环引用
const json = JSON.stringify(meetup, function replacer(key, value) {
  return key != "" && value == meetup ? undefined : value;
});

console.log(json);
//把日期转换回来
const obj = JSON.parse(json, function reviver(key, value) {
  return key === "date" ? new Date(value) : value;
});
console.log(obj.date.getDate());
