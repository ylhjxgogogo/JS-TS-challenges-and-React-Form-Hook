let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
  { id: 6, name: "部门6", pid: 0 },
];
function get_tree(arr) {
  const list = [];
  const hashmap = {};

  for (let i = 0; i < arr.length; i++) {
    // 存储每个id下的子元素
    let pid = arr[i].pid;
    let id = arr[i].id;

    if (!hashmap[id]) {
      hashmap[id] = { children: [] };
    }

    hashmap[id] = { ...arr[i], children: hashmap[id].children };

    if (pid === 0) {
      list.push(hashmap[id]);
    } else {
      if (!hashmap[pid]) {
        hashmap[pid] = {
          children: [],
        };
      }

      hashmap[pid].children.push(hashmap[id]);
    }
  }
  return list;
}

const ans = get_tree(arr);
console.log(ans);
