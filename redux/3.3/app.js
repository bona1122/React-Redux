// Flux 아키텍처
// 구독 발행 모델

function createStore() {
  let state;
  let handlers = [];

  function send(action) {
    state = worker(state, action);
    handlers.forEach((handler) => handler());
  }
  function subscribe(handler) {
    handlers.push(handler);
  }
  function getState() {
    return state;
  }

  return {
    send,
    getState,
    subscribe,
  };
}

// 상태 변경 로직
function worker(state = { count: 0 }, action) {
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + 1 };
    default:
      return { ...state };
  }
}

const store = createStore(worker);

store.subscribe(function () {
  console.log(store.getState());
});

store.send({ type: "increase" });
store.send({ type: "increase" });