import _ from 'lodash';
import {
  GET_COMMENTS_BY_POST,
  GET_COMMENT_BY_ID,
  ADD_COMMENT,
  VOTE_FOR_COMMENT,
  DELETE_COMMENT,
} from '../actions';

import {
  DELETE_POST
} from '../actions/posts';

export default function comments(state={}, action) {
  switch (action.type) {
    case GET_COMMENT_BY_ID:
    case ADD_COMMENT:
      return {
        ...state,
        [action.data.id]: action
      };
    case VOTE_FOR_COMMENT:
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
    case GET_COMMENTS_BY_POST:
      return {
        ...state,
        ..._.keyBy(action.data, 'id')
      };
    default:
      return state;
  }
}