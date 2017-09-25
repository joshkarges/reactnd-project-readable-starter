export function getIsLoadingReducer(name, initialValue = false) {
  return function isLoading(state = initialValue, action) {
    switch (action.type) {
      case 'IS_LOADING_' + name.toUpperCase():
        return action.isLoading;
      default:
        return state;
    }
  };
}

export function getFailureReducer(name, initialValue = false) {
  return function failure(state = initialValue, action) {
    switch (action.type) {
      case 'FAILURE_FETCHING_' + name.toUpperCase():
        return action.failure;
      default:
        return state;
    }
  };
}