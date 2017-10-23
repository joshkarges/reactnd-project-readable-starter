import { combineReducers } from 'redux';
import { getIsLoadingReducer, getFailureReducer } from './util';
import _ from 'lodash';
import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST
} from '../actions';

import {
  SUCCESS_FETCHING_ALL_POSTS,
  SUCCESS_FETCHING_POST_BY_ID,
  SUCCESS_FETCHING_POSTS_BY_CATEGORY,
  SUCCESS_VOTE_FOR_POST
} from '../actions/posts';

function posts(state={}, action) {
  switch (action.type) {
    case SUCCESS_FETCHING_POST_BY_ID:
    case ADD_POST:
      return {
        ...state,
        [action.data.id]: action.data
      };
    case DELETE_POST: // TODO: make sure the parentDeleted property is true for all the comments
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: true
        }
      };
    case SUCCESS_VOTE_FOR_POST:
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          voteScore: action.data.voteScore
        }
      };
    case EDIT_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action
        }
      };
    case SUCCESS_FETCHING_POSTS_BY_CATEGORY:
      return {
        ...state,
        ..._.keyBy(action.data, 'id')
      };
    case SUCCESS_FETCHING_ALL_POSTS:
      return _.keyBy(action.data, 'id');
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  isLoading: getIsLoadingReducer('posts'),
  failure: getFailureReducer('posts')
});