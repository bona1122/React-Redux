/* @jsx createElement */
import { render, createElement, Component } from "./react";

class Title extends Component {
  // Component 클래스를 상속받아야함.
  render() {
    // jsx를 반환하는 render 메소드를 구현해야함.
    return <h1>{this.props.children}</h1>;
  }
}

function Item(props) {
  return <li style={`color:${props.color}`}>{props.children}</li>;
}

const App = () => (
  <p>
    <Title>React 정말 클래스 컴포넌트 잘 만들기</Title>
    <ul>
      <Item color="red">첫 번째 아이템</Item>
      <Item color="green">두 번째 아이템</Item>
      <Item color="blue">세 번째 아이템</Item>
    </ul>
  </p>
);

render(<App />, document.querySelector("#root"));
