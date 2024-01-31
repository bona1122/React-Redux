export const logger = (store) => (next) => (action) => {
  const currentState = store.getState();

  console.groupCollapsed("action logger =>", action.type); // 이후 콘솔 접히게
  console.log("current state: ", currentState);
  console.log("action payload: ", action.payload);
  console.groupEnd();

  next(action);
};
