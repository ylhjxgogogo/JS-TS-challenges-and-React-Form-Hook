class MyEvent {
  constructor() {
    this.eventPool = new Map();
  }
  //实现订阅功能
  /**
   *
   * @param {string} event  订阅的事件
   * @param {Function} handleEvent  事件处理函数
   */
  tap(event, handleEvent) {
    if (!this.eventPool.has(event)) {
      this.eventPool.set(event, [handleEvent]);
    } else {
      this.eventPool.get(event).push(handleEvent);
    }
  }
  //取消订阅
  unTap(event, handleEvent) {
    if (!this.eventPool.has(event)) return;
    let fnList = this.eventPool.get(event);
    const index = fnList.indexOf(handleEvent);
    if (index !== -1) {
      fnList.splice(index, 1);
    }
  }
  //实现发布功能
  /**
   *
   * @param {string} event 发布的事件名
   * @param  {...any} arg  传入的参数数组
   */
  call(event, ...arg) {
    if (!this.eventPool.has(event)) return;
    const fnList = this.eventPool.get(event);
    fnList.forEach((fn) => {
      fn.apply(null, arg);
    });
  }
}
class Dom extends MyEvent {
  constructor() {
    super();
  }
}
const dom = new Dom();
dom.tap("click", (e) => {
  console.log(e);
});
dom.tap("click", () => {
  console.log("click2");
});
function handleChange() {
  console.log("change");
}
dom.tap("change", handleChange);
dom.call("click", "haha");
dom.call("change");
console.log("-------");
dom.unTap("change", handleChange);
dom.call("change");
