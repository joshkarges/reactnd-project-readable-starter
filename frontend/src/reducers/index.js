import {
  GET_ALL_CATEGORIES,
  GET_ALL_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_POST_BY_ID,
  GET_COMMENTS_BY_POST,
  GET_COMMENT_BY_ID,
  ADD_POST,
  DELETE_POST,
  VOTE_FOR_POST,
  EDIT_POST,
  ADD_COMMENT,
  VOTE_FOR_COMMENT,
  DELETE_COMMENT,
  DELETE_COMMENTS_BY_PARENT
} from '../actions'
import { combineReducers } from 'redux';

function categories(state={}, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
    default:
      return state;
  }
}

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
    case GET_ALL_POSTS:
    case GET_POSTS_BY_CATEGORY:
    case GET_POST_BY_ID:
    default:
      return state;
  }
}

function comments(state={}, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        [action.id]: action
      };
    case VOTE_FOR_COMMENT:
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
    case DELETE_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: true
        }
      };
    case DELETE_COMMENTS_BY_PARENT:
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
    case GET_COMMENTS_BY_POST:
    case GET_COMMENT_BY_ID:
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})