import _ from 'lodash';

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

export function getAllAttemptingAndFailureReducers(actionList) {
  return actionList.reduce((p, action) => ({
      ...p,
      ['attempting' + _.camelCase(action)]: getAttemptingReducer(action),
      ['failure' + _.camelCase(action)]: getFailureReducer(action)
    }), {});
}
