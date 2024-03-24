import { createStore, actionCreator } from "./redux.js";
import { reducer } from "./reducer.js";
import * as Actions from "./actions.js";

const store = createStore(reducer);

store.subscribe(function () {
  console.log("sub => ", store.getState());
});

store.dispatch(Actions.increase());
console.log("dis => ", store.getState());
store.dispatch(Actions.increase());
console.log("dis => ", store.getState());
store.dispatch(Actions.increase());
console.log("dis => ", store.getState());
store.dispatch(Actions.decrease());
console.log("dis => ", store.getState());
store.dispatch(Actions.reset());
console.log("dis => ", store.getState());
