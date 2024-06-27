const vdom = {
  tag: "DIV",
  attrs: {
    id: "app",
  },
  children: [
    {
      tag: "SPAN",
      children: [{ tag: "A", children: [] }],
    },
    {
      tag: "SPAN",
      children: [
        { tag: "A", children: [] },
        { tag: "A", children: [] },
      ],
    },
  ],
};
function getRelDom(vdom, container) {
  const children = vdom[children];
  const dom = document.createElement(vdom.tag);
  const attrsObj = vdom.attrs;
  if (attrsObj) {
    for (const key in attrsObj) {
      dom[key] = vdom[key];
    }
  }
  if (!children) {
    return container.append(dom);
  } else {
    getRelDom(children, dom);
  }
}
export default getRelDom;
