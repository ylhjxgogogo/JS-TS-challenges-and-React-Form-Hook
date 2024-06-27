class Person1 {
  private name: string = "yl";
}
const person = new Person1();
console.log(person["name"]); //通过[]获取私有成员
if ("name" in person) {
  // 正确
  console.log(person["name"]);
}
//上面使用private设置私有属性还是会通过[]访问到，已淘汰

//采用了 ES2022 的私有成员写法（属性名前加#)
class Person2 {
  #name: string = "yl";
}
const person2 = new Person2();
// person2["name"]; //报错

//protected的成员，实例不能使用，只能自身和子类可以使用

class Point {
  //此时的public不能忽略
  constructor(public x: number, public y: number) {}
}
//等同于
// class Point{
//     x:number;
//     y:number
//     constructor(x:number,y:number){
//         this.x=x;
//         this.y=y
//     }
// }
const point = new Point(10, 20);
console.log(point.x);
