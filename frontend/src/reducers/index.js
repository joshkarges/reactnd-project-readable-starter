import {
  GET_ALL_CATEGORIES,
  GET_ALL_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_POST_BY_ID,
  GET_COMMENTS_BY_POST,
  GET_COMMENT_BY_ID
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
    case GET_ALL_POSTS:
    case GET_POSTS_BY_CATEGORY:
    case GET_POST_BY_ID:
    default:
      return state;
  }
}

function comments(state={}, action) {
  switch (action.type) {
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