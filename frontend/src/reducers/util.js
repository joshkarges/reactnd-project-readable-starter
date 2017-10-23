export function getAttemptingReducer(name, initialValue = false) {
  return function isAttempting(state = initialValue, action) {
    switch (action.type) {
      case 'ATTEMPTING_' + name.toUpperCase():
        return action.isAttempting;
      default:
        return state;
    }
  };
}

export function getFailureReducer(name, initialValue = false) {
  return function failure(state = initialValue, action) {
    switch (action.type) {
      case 'FAILURE_' + name.toUpperCase():
        return action.failure;
      default:
        return state;
    }
  };
}