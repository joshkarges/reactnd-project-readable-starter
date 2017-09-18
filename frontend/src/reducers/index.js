import categories from './categories';
import posts from './posts';
import comments from './comments';
import { combineReducers } from 'redux';

export default combineReducers({
  categories,
  posts,
  comments
})