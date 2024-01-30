const hooks = [];
let currentComponent = 0;

export class Component {
  constructor(props) {
    this.props = props;
  }
}

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

function makeProps(props, children) {
  return {
    ...props,
    children: children.length === 1 ? children[0] : children,
  };
}

function useState(initValue) {
  let position = currentComponent - 1;

  if (!hooks[position]) hooks[position] = initValue;

  const modifier = (nextValue) => {
    hooks[position] = nextValue;
  };

  return [hooks[position], modifier];
}

export function createElement(tag, props, ...children) {
  props = props || {};
  if (typeof tag === "function") {
    if (tag.prototype instanceof Component) {
      const instance = new tag(makeProps(props, children));
      return instance.render();
    } else {
      hooks[currentComponent] = null;
      currentComponent++;

      if (children.length > 0) {
        return tag(makeProps(props, children));
      } else {
        return tag(props);
      }
    }
  } else {
    return {
      tag,
      props,
      children,
    };
  }
}

export function render(vdom, container) {
  container.appendChild(createDOM(vdom));
}

export const render = function () {
  let prevDom = null;
  return function (vdom, container) {
    if (prevDom == null) prevDom = vdom;

    // prevDom 이 있다면 diff를 통해 바뀐 부분만 업데이트

    container.appendChild(createDOM(vdom));
  };
};
