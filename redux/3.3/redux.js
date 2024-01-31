export const actionCreator = (type) => (payload) => ({
  type,
  payload,
}); // curry 함수를 이용하여 호출 지연 테크닉 사용. -> 유연한 코드 작성 가능.

export function createStore(reducer) {
  let state;
  let handlers = [];

  function dispatch(action) {
    state = reducer(state, action);
    handlers.forEach((handler) => handler());
  }
  function subscribe(handler) {
    handlers.push(handler);
  }
  function getState() {
    return state;
  }

  return {
    dispatch,
    getState,
    subscribe,
  };
}
