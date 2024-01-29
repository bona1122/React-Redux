
function createDOM(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node); // 문자열 dom을 만들어서 리턴
  }

  const element = document.createElement(node.tag);

  // TODO: bind, context 개념 복습
  node.children
    .map(createDOM)
    .forEach(element.appendChild.bind(element)); // bind를 통해 element를 this로 넘겨줌

  return element;
}

const vdom = {
  tag: 'p',
  props: {},
  children: [
    {
      tag: 'h1',
      props: {},
      children: ["React 만들기"],
    },
    {
      tag: 'ul',
      props: {},
      children: [
        {
          tag: 'li',
          props: {},
          children: ["첫 번째 아이템"]
        },
        {
          tag: 'li',
          props: {},
          children: ["두 번째 아이템"]
        },
        {
          tag: 'li',
          props: {},
          children: ["세 번째 아이템"]
        },
      ]
    }
  ],
};

document
  .querySelector('#root')
  .appendChild(createDOM(vdom));  

