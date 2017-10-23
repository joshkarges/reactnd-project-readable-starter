import { combineReducers } from 'redux';
import { getAttemptingReducer, getFailureReducer } from './util';
import {
  FETCH_CATEGORIES,
  SUCCESS_FETCH_CATEGORIES
} from '../actions/categories';

function categories(state = [], action) {
  switch (action.type) {
    case SUCCESS_FETCH_CATEGORIES:
      return action.data.categories;
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  isLoading: getAttemptingReducer(FETCH_CATEGORIES),
  failure: getFailureReducer(FETCH_CATEGORIES)
})