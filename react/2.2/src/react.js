export class Component {
  constructor(props) {
    // 함수컴포넌트의 함수의 역할을 한다고 생각하기
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

export function createElement(tag, props, ...children) {
  props = props || {};
  if (typeof tag === "function") {
    if (tag.prototype instanceof Component) {
      const instance = new tag(makeProps(props, children));
      return instance.render();
    } else {
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

// 클래스 컴포넌트는 함수 컴포넌트와 다르게 상태를 가질 수 있다. => 함수 컴포넌트도 상태를 가질 수 있게 하기 위해 hooks가 나옴