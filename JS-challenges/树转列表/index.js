const tree = [
  {
    id: 1,
    name: "部门1",
    pid: 0,
    children: [
      {
        id: 2,
        name: "部门2",
        pid: 1,
        children: [],
      },
      {
        id: 3,
        name: "部门3",
        pid: 1,
        children: [
          {
            id: 4,
            name: "部门4",
            pid: 3,
            children: [
              {
                id: 5,
                name: "部门5",
                pid: 4,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "部门6",
    pid: 0,
    children: [],
  },
];
const tree2 = [
  {
    id: 1,
    name: "Node 1",
    children: [
      { id: 2, name: "Node 1.1", children: [] },
      {
        id: 3,
        name: "Node 1.2",
        children: [{ id: 4, name: "Node 1.2.1", children: [] }],
      },
    ],
  },
];

export function treeToList(tree) {
  if (!tree || !tree.length) return;
  const list = [];
  function traverse(tree) {
    tree.forEach((TreeObj) => {
      const item = {};
      for (const key in TreeObj) {
        if (key !== "children") {
          item[key] = TreeObj[key];
        }
      }
      list.push(item);
      if (TreeObj.children && TreeObj.children.length > 0) {
        traverse(TreeObj.children);
      }
    });
  }
  traverse(tree);

  return list;
}
const listArr = treeToList(tree);
// const listArr2 = treeToList(tree2);
console.log(listArr);
