import _ from 'lodash';
import { combineReducers } from 'redux';
import {
  FETCH_COMMENTS_BY_POST,
  FETCH_COMMENTS_BY_ID,
  ADD_COMMENT,
  VOTE_FOR_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SUCCESS_FETCH_COMMENTS_BY_POST,
  SUCCESS_FETCH_COMMENTS_BY_ID,
  SUCCESS_VOTE_FOR_COMMENT,
} from '../actions/comments';

import {
  DELETE_POST
} from '../actions/posts';

import { getAllAttemptingAndFailureReducers } from './util';

function comments(state={}, action) {
  switch (action.type) {
    case SUCCESS_FETCH_COMMENTS_BY_ID:
    case ADD_COMMENT:
      return {
        ...state,
        [action.data.id]: action
      };
    case SUCCESS_VOTE_FOR_COMMENT:
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          voteScore: action.data.voteScore
        }
      };
    case DELETE_COMMENT:
      return {
        ...state,
        [action.data.id]: {
          ...state[action.data.id],
          deleted: true
        }
      };
    case DELETE_POST:
      let commentsFromParent = state.filter(c => (c.parentId === action.parentId));
      return commentsFromParent.reduce((p,c) => {
        return {
          ...state,
          [c.id]: {
            ...state[c.id],
            parentDeleted: true
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
  FETCH_COMMENTS_BY_ID,
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