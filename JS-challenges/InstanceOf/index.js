function myInstanceof(obj, constructor) {
  let proto = Object.getPrototypeOf(obj); //代替 __proto__
  //直到proto为空，找到原型链末尾 null
  while (proto) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
class Animal {}
class Rabbit extends Animal {}
function Test() {}
const test = new Test();
new.target(test)
let rabbit = new Rabbit();
console.log(myInstanceof(rabbit, Object));
