export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';
export const GET_POST_BY_ID = 'GET_POST_BY_ID';
export const GET_COMMENTS_BY_POST = 'GET_COMMENTS_BY_POST';
export const GET_COMMENT_BY_ID = 'GET_COMMENT_BY_ID';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_FOR_POST = 'VOTE_FOR_POST';
export const EDIT_POST = 'EDIT_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const VOTE_FOR_COMMENT = 'VOTE_FOR_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

function getActionCreator(type) {
  return ({ ...args }) => ({
    type: type,
    ...args
  });
}

export const
  getAllCategories   = getActionCreator(GET_ALL_CATEGORIES),
  getAllPosts        = getActionCreator(GET_ALL_POSTS),
  getPostsByCategory = getActionCreator(GET_POSTS_BY_CATEGORY),
  getPostById        = getActionCreator(GET_POST_BY_ID),
  getCommentsByPost  = getActionCreator(GET_COMMENTS_BY_POST),
  getCommentById     = getActionCreator(GET_COMMENT_BY_ID),
  addPost            = getActionCreator(ADD_POST), // { id, timestamp, title, body, author, category }
  deletePost         = getActionCreator(DELETE_POST), // { id }
  voteForPost        = getActionCreator(VOTE_FOR_POST), // { id, option }
  editPost           = getActionCreator(EDIT_POST), // { id, ...data }
  addComment         = getActionCreator(ADD_COMMENT), // { id, timestamp, body, author, parentId }
  voteForComment     = getActionCreator(VOTE_FOR_COMMENT), // { id, option }
  deleteComment      = getActionCreator(DELETE_COMMENT); // { id, option }
