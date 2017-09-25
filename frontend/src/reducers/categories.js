import { combineReducers } from 'redux';
import { getIsLoadingReducer, getFailureReducer } from './util';
import {
  SUCCESS_FETCHING_CATEGORIES,
} from '../actions/categories';

function categories(state = [], action) {
  switch (action.type) {
    case SUCCESS_FETCHING_CATEGORIES:
      return action.data.categories;
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  isLoading: getIsLoadingReducer('categories'),
  failure: getFailureReducer('categories')
})