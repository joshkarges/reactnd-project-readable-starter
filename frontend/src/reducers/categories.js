import {
  GET_ALL_CATEGORIES,
} from '../actions';

export default function categories(state={}, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
    default:
      return state;
  }
}