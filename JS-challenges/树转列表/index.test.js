import { describe, it, expect } from "vitest";
import { treeToList } from "./index.js";

describe("treeToList", () => {
  it("test1-->tree to list", () => {
    const tree = [
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
    const result = [
      { id: 1, name: "Node 1" },
      { id: 2, name: "Node 1.1" },
      { id: 3, name: "Node 1.2" },
      { id: 4, name: "Node 1.2.1" },
    ];

    expect(treeToList(tree)).toEqual(result);
  });
  it("test2-->tree to list", () => {
    const tree2 = [
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
    const result2 = [
      { id: 1, name: "部门1", pid: 0 },
      { id: 2, name: "部门2", pid: 1 },
      { id: 3, name: "部门3", pid: 1 },
      { id: 4, name: "部门4", pid: 3 },
      { id: 5, name: "部门5", pid: 4 },
      { id: 6, name: "部门6", pid: 0 },
    ];
    expect(treeToList(tree2)).toEqual(result2);
  });
});
