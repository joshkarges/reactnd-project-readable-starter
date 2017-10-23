import {
  getFetchingActionCreators,
  getPostingActionCreator
} from './util';

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';

// FETCH ALL POSTS
export const ALL_POSTS = 'ALL_POSTS';
const all_posts_url = `${process.env.REACT_APP_BACKEND}/posts`;
const fetchAllPostsActions = getFetchingActionCreators(ALL_POSTS, all_posts_url);

export const IS_LOADING_ALL_POSTS = fetchAllPostsActions.IS_LOADING_ALL_POSTS;
export const SUCCESS_FETCHING_ALL_POSTS = fetchAllPostsActions.SUCCESS_FETCHING_ALL_POSTS;
export const FAILURE_FETCHING_ALL_POSTS = fetchAllPostsActions.FAILURE_FETCHING_ALL_POSTS;
export const fetchAllPosts = fetchAllPostsActions.fetchAllPosts;

// FETCH POST BY ID
export const POST_BY_ID = 'POST_BY_ID';
const post_by_id_url = `${process.env.REACT_APP_BACKEND}/posts/:id`;
const fetchPostByIdActions = getFetchingActionCreators(POST_BY_ID, post_by_id_url);

export const IS_LOADING_POST_BY_ID = fetchPostByIdActions.IS_LOADING_POST_BY_ID;
export const SUCCESS_FETCHING_POST_BY_ID = fetchPostByIdActions.SUCCESS_FETCHING_POST_BY_ID;
export const FAILURE_FETCHING_POST_BY_ID = fetchPostByIdActions.FAILURE_FETCHING_POST_BY_ID;
export const fetchPostById = fetchPostByIdActions.fetchPostById;

// VOTE
export const VOTE_FOR_POST = 'VOTE_FOR_POST';
const vote_for_post_url = `${process.env.REACT_APP_BACKEND}/posts/:id`;
const voteForPostActions = getPostingActionCreator(VOTE_FOR_POST, vote_for_post_url); // {id: [post.id], option: 'upVote'|'downVote'}

export const { ATTEMPTING_VOTE_FOR_POST, SUCCESS_VOTE_FOR_POST, FAILURE_VOTE_FOR_POST, postVoteForPost } = voteForPostActions;
// export const SUCCESS_VOTE_FOR_POST = voteForPostActions.SUCCESS_VOTE_FOR_POST;
// export const SUCCESS_VOTE_FOR_POST = voteForPostActions.SUCCESS_VOTE_FOR_POST;
// export const SUCCESS_VOTE_FOR_POST = voteForPostActions.SUCCESS_VOTE_FOR_POST;

// FETCH POSTS BY CATEGORY
export const POSTS_BY_CATEGORY = 'POSTS_BY_CATEGORY';
const posts_by_category_url = `${process.env.REACT_APP_BACKEND}/:category/posts`;
const fetchPostsByCategoryActions = getFetchingActionCreators(POSTS_BY_CATEGORY, posts_by_category_url);

export const IS_LOADING_POSTS_BY_CATEGORY = fetchPostsByCategoryActions.IS_LOADING_POSTS_BY_CATEGORY;
export const SUCCESS_FETCHING_POSTS_BY_CATEGORY = fetchPostsByCategoryActions.SUCCESS_FETCHING_POSTS_BY_CATEGORY;
export const FAILURE_FETCHING_POSTS_BY_CATEGORY = fetchPostsByCategoryActions.FAILURE_FETCHING_POSTS_BY_CATEGORY;
export const fetchPostsByCategory = fetchPostsByCategoryActions.fetchPostsByCategory;

export const postsFetchingActions = {
  [ALL_POSTS]: fetchAllPosts,
  [POSTS_BY_CATEGORY]: fetchPostsByCategory,
  [POST_BY_ID]: fetchPostById
}