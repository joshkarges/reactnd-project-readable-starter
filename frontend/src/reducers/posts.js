import { combineReducers } from 'redux';
import { getAttemptingReducer, getFailureReducer } from './util';
import _ from 'lodash';
import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST
} from '../actions';

import {
  FETCH_ALL_POSTS,
  FETCH_POST_BY_ID,
  FETCH_POSTS_BY_CATEGORY,
  VOTE_FOR_POST,
  SUCCESS_FETCH_ALL_POSTS,
  SUCCESS_FETCH_POST_BY_ID,
  SUCCESS_FETCH_POSTS_BY_CATEGORY,
  SUCCESS_VOTE_FOR_POST
} from '../actions/posts';

function posts(state={}, action) {
  switch (action.type) {
    case SUCCESS_FETCH_POST_BY_ID:
    case ADD_POST:
      return {
        ...state,
        [action.data.id]: action.data
      };
    case DELETE_POST: // TODO: make sure the parentDeleted property is true for all the comments
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
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
        [action.data.id]: {
          ...state[action.data.id],
          ...action.data
        }
      };
    case SUCCESS_FETCH_POSTS_BY_CATEGORY:
      return {
        ...state,
        ..._.keyBy(action.data, 'id')
      };
    case SUCCESS_FETCH_ALL_POSTS:
      return _.keyBy(action.data, 'id');
    default:
      return state;
  }
}

const attemptingAndFailureReducers = [
    FETCH_ALL_POSTS,
    FETCH_POST_BY_ID,
    FETCH_POSTS_BY_CATEGORY,
    VOTE_FOR_POST
  ].reduce((p, action) => ({
      ...p,
      ['attempting' + _.camelCase(action)]: getAttemptingReducer(action),
      ['failure' + _.camelCase(action)]: getFailureReducer(action)
    }), {})

export default combineReducers({
  posts,
  ...attemptingAndFailureReducers
});