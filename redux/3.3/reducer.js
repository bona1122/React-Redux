import * as ActionTypes from "./action-type.js";

const InitializeState = {
  count: 0,
};
export function reducer(state = InitializeState, action) {
  switch (action.type) {
    case ActionTypes.INCREASE:
      return { ...state, count: state.count + 1 };
    case ActionTypes.DECREASE:
      return { ...state, count: state.count - 1 };
    case ActionTypes.RESET:
      fetch("/reset")
        .then((res) => res.json())
        .then((result) => {
          if (result) return { ...state, count: 0 };
        });

    default:
      return { ...state };
  }
}

// reducer 함수는 순수 함수로 작성해야 한다.
// 즉, 비동기 처리를 하면 안된다.