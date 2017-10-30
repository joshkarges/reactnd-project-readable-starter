import _ from 'lodash';
import { combineReducers } from 'redux';
import {
  FETCH_COMMENTS_BY_POST,
  FETCH_COMMENT_BY_ID,
  ADD_COMMENT,
  VOTE_FOR_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SUCCESS_FETCH_COMMENTS_BY_POST,
  SUCCESS_FETCH_COMMENT_BY_ID,
  SUCCESS_VOTE_FOR_COMMENT,
  SUCCESS_ADD_COMMENT,
  SUCCESS_EDIT_COMMENT,
  SUCCESS_DELETE_COMMENT
} from '../actions/comments';

import {
  SUCCESS_DELETE_POST
} from '../actions/posts';

import { getAllAttemptingAndFailureReducers } from './util';

function comments(state={}, action) {
  switch (action.type) {
    case SUCCESS_FETCH_COMMENT_BY_ID:
    case SUCCESS_ADD_COMMENT:
      return {
        ...state,
        [action.data.id]: action.data
      };
    case SUCCESS_EDIT_COMMENT:
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          ...action.data
        }
      }
    case SUCCESS_VOTE_FOR_COMMENT:
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          voteScore: action.data.voteScore
        }
      };
    case SUCCESS_DELETE_COMMENT:
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          deleted: action.data.deleted
        }
      };
    case SUCCESS_DELETE_POST:
      let commentsFromParent = _.filter(state, (c) => (c.parentId === action.parentId));
      return commentsFromParent.reduce((p,c) => {
        return {
          ...state,
          [c.id]: {
            ...state[c.id],
            parentDeleted: c.parentDeleted
          }
        };
      }, state);
    case SUCCESS_FETCH_COMMENTS_BY_POST:
      return {
        ...state,
        ..._.keyBy(action.data, 'id')
      };
    default:
      return state;
  }
}

const attemptingAndFailureReducers = getAllAttemptingAndFailureReducers([
  FETCH_COMMENT_BY_ID,
  FETCH_COMMENTS_BY_POST,
  VOTE_FOR_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
]);

export default combineReducers({
  comments,
  ...attemptingAndFailureReducers
});