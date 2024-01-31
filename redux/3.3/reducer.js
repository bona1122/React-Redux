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
      return { ...state, count: 0 };
    default:
      return { ...state };
  }
}
