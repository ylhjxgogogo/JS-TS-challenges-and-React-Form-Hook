const date = new Date(Date.now());
console.log(date.getDay()); //返回的是星期几，0表示星期天
//传入一个日期对象，返回今天是周几
// type WeekDay='MO'|'TU'|'WE'|'TH'|"FR"|"SA"|"SU"
function getWeekDay(date) {
  let days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  const day = date.getDay(); //0-6 从星期天到星期六
  if (day === 0) return days[days.length - 1];
  return days[day - 1];
}
function getDateAgo(date, day) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() - day);
  return newDate.getDate();
}
function getLastDayOfMonth(year, month) {
  const date = new Date(year, month + 1, 0);
  console.log(date);
  return date.getDate();
}
//今天过去了多少秒
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSecondsToday() {
  let now = new Date();

  // 使用当前的 day/month/year 创建一个对象
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // ms difference
  return Math.round(diff / 1000); // make seconds
}
//距离明天还有多少秒
function getSecondsToTomorrow() {
  //当前日期
  const date = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  const diff = tomorrow - date;
  return Math.round(diff / 1000);
}
function formatDate(date) {
  // date 是传入的时间
  const now = new Date(); // 当前的时间
  const diff = now - date; // 时间差，单位为毫秒
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 1) {
    return "right now";
  } else if (minutes < 1) {
    return `${seconds} sec. ago`;
  } else if (hours < 1) {
    return `${minutes} min. ago`;
  } else {
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以需要加1
    const year = String(now.getFullYear()).slice(2);
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year} ${hour}:${minute}`;
  }
}

// 示例测试
const pastDate2 = new Date();
pastDate2.setMinutes(pastDate2.getMinutes() - 5); // 5分钟前
console.log(formatDate(pastDate2)); // 输出 "5 min. ago"
