import { combineReducers } from 'redux';
import { getIsLoadingReducer, getFailureReducer } from './util';
import {
  GET_POSTS_BY_CATEGORY,
  GET_POST_BY_ID,
  ADD_POST,
  DELETE_POST,
  VOTE_FOR_POST,
  EDIT_POST
} from '../actions';

import { SUCCESS_FETCHING_POSTS } from '../actions/posts';

function posts(state={}, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        [action.id]: action
      };
    case DELETE_POST: // TODO: make sure the parentDeleted property is true for all the comments
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: true
        }
      };
    case VOTE_FOR_POST:
      let newVoteScore = state[action.id].voteScore +
        (action.option === 'upVote') ? 1 :
        (action.option === 'downVote') ? -1 : 0;
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: newVoteScore
        }
      };
    case EDIT_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action
        }
      }
    case SUCCESS_FETCHING_POSTS:
      return action.data;
    case GET_POSTS_BY_CATEGORY:
    case GET_POST_BY_ID:
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  isLoading: getIsLoadingReducer('posts'),
  failure: getFailureReducer('posts')
});