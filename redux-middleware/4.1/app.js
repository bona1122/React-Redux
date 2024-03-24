import { createStore } from "./redux.js";
import * as Actions from "./actions.js";
import reducer from "./reducer.js";
import { SET_COUNTER, ASYNC_INCREASE_COUNTER } from "./action-type.js";
import { logger } from "./logger.js";

const asyncRouter = (jobs) => (store) => (next) => (action) => {
  const matchJob = Object.entries(jobs).find(([type]) => action.type === type);
  if (matchJob) {
    matchJob[1](store, action);
  } else {
    next(action);
  }
};

const asyncJobs = {
  // 각 비동기 액션마다의 처리기
  [ASYNC_INCREASE_COUNTER]: function (store, action) {
    store.dispatch(Actions.asyncRequest());
    setTimeout(() => {
      store.dispatch(Actions.increase(20));
      store.dispatch(Actions.asyncResponse());
    }, 3000);
  },
};

const store = createStore(reducer, [logger, asyncRouter(asyncJobs)]);

const counterDisplay = document.querySelector("#counter");
const loadingMessage = document.querySelector("#loading");
const btnIncrease = document.querySelector("#btn-increase");
const btnAsyncIncrease = document.querySelector("#btn-async-increase");
const btnDecrease = document.querySelector("#btn-decrease");
const btnReset = document.querySelector("#btn-reset");

store.subscribe(function () {
  // 상태가 바뀌면 실행될 함수
  const { counter, request } = store.getState();

  loadingMessage.style.visibility = request ? "visible" : "hidden";
  counterDisplay.textContent = counter;
});

store.dispatch(Actions.setCounter(0));

btnReset.addEventListener("click", () => {
  store.dispatch(Actions.setCounter(0));
});

btnIncrease.addEventListener("click", () => {
  store.dispatch(Actions.increase());
});

btnAsyncIncrease.addEventListener("click", () => {
  store.dispatch(Actions.asyncIncrease({ url: "/async-increase" }));
});

btnDecrease.addEventListener("click", () => {
  store.dispatch(Actions.decrease());
});
