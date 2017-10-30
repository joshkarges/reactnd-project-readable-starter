import _ from 'lodash';
import { combineReducers } from 'redux';
import { getAllAttemptingAndFailureReducers } from './util';
import {
  FETCH_ALL_POSTS,
  FETCH_POST_BY_ID,
  FETCH_POSTS_BY_CATEGORY,
  VOTE_FOR_POST,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  SUCCESS_FETCH_ALL_POSTS,
  SUCCESS_FETCH_POST_BY_ID,
  SUCCESS_FETCH_POSTS_BY_CATEGORY,
  SUCCESS_VOTE_FOR_POST,
  SUCCESS_ADD_POST,
  SUCCESS_EDIT_POST,
  SUCCESS_DELETE_POST
} from '../actions/posts';

function posts(state={}, action) {
  switch (action.type) {
    case SUCCESS_FETCH_POST_BY_ID:
      if (_.isEmpty(action.data)) {
        return {
          ...state,
          [action.opts.id]: {
            ...state[action.opts.id],
            deleted: true
          }
        };
      }
    case SUCCESS_ADD_POST:
      return {
        ...state,
        [action.data.id]: action.data
      };
    case SUCCESS_DELETE_POST: // TODO: make sure the parentDeleted property is true for all the comments
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          deleted: action.data.deleted
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
    case SUCCESS_EDIT_POST:
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

const attemptingAndFailureReducers = getAllAttemptingAndFailureReducers([
    FETCH_ALL_POSTS,
    FETCH_POST_BY_ID,
    FETCH_POSTS_BY_CATEGORY,
    VOTE_FOR_POST,
    ADD_POST,
    EDIT_POST,
    DELETE_POST
  ]);

export default combineReducers({
  posts,
  ...attemptingAndFailureReducers
});