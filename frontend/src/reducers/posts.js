import {
  GET_ALL_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_POST_BY_ID,
  ADD_POST,
  DELETE_POST,
  VOTE_FOR_POST,
  EDIT_POST
} from '../actions';

export default function posts(state={}, action) {
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