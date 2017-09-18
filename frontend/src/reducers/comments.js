import {
  GET_COMMENTS_BY_POST,
  GET_COMMENT_BY_ID,
  ADD_COMMENT,
  VOTE_FOR_COMMENT,
  DELETE_COMMENT,
  DELETE_COMMENTS_BY_PARENT
} from '../actions';

export default function comments(state={}, action) {
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