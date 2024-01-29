export function createDOM(node) {
  if (typeof node === "string") {
    return document.createTextNode(node); // 문자열 dom을 만들어서 리턴
  }

  const element = document.createElement(node.tag);

  // props 처리
  Object.entries(node.props).forEach(([name, value]) =>
    element.setAttribute(name, value)
  );

  // TODO: bind, context 개념 복습
  node.children.map(createDOM).forEach(element.appendChild.bind(element)); // bind를 통해 element를 this로 넘겨줌

  return element;
}

export function createElement(tag, props, ...children) {
  props = props || {};
  return {
    tag,
    props,
    children,
  };
}

export function render(vdom, container) {
  container.appendChild(createDOM(vdom));
}
