function createH1(props) {
  return [document.createElement("h1")].map((el) => {
    Object.entries({ ...props, "data-id": "subject" }).forEach(
      ([name, value]) => el.setAttribute(name, value)
    );
    return el;
  })[0];
}

function createDiv(props) {
  return [document.createElement("div")].map((el) => {
    Object.entries({ ...props, "data-id": "layout" }).forEach(([name, value]) =>
      el.setAttribute(name, value)
    );
    return el;
  })[0];
}

const createMap = {
  h1: createH1,
  div: createDiv,
};
const coupler = map => (type, props) => map[type](props);
const createElement = coupler(createMap);

// function createElement(type, props) {
//   return createMap[type](props);
//   // switch(type){
//   //   case 'h1': return createH1(props);
//   //   case 'div': return createDiv(props);
//   // }
// }

// => 소프트웨어는 계속 변화한다. 변화를 빠르고 안전하게 할 수 있어야한다.