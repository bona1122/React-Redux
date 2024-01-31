export const actionCreator = (type) => (payload) => ({
  type,
  payload,
});

export function createStore(reducer, middlewares = []) {
  let state;
  const handlers = [];

  function dispatch(action) {
    state = reducer(state, action);
    handlers.forEach((handler) => handler());
  }

  function getState() {
    return state;
  }

  function subscribe(handler) {
    handlers.push(handler);
  }

  const store = {
    getState,
    subscribe,
    dispatch,
  };

  middlewares = Array.from(middlewares).reverse();

  // 기존 디스패치 함수가 미들웨어의 마지막 함수로 대체되어야함.
  let lastDispatch = dispatch; // 최초의 디스패치를 last dispatch로 설정

  middlewares.forEach((middleware) => {
    lastDispatch = middleware(store)(lastDispatch);
  });

  store.dispatch = lastDispatch; // 맨 마지막에 있는 미들웨어가 호출이 되면, dispacsh가 호출되는 구조.
  return store;
}

// money patching
