import {
  getFetchingActionCreators,
  getActionCreator
} from './util';

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';
export const GET_POST_BY_ID = 'GET_POST_BY_ID';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';

// FETCH ALL POSTS
const all_posts_url = `${process.env.REACT_APP_BACKEND}/posts`;

const fetchAllPostsActions = getFetchingActionCreators('all_posts', all_posts_url);

export const IS_LOADING_ALL_POSTS = fetchAllPostsActions.IS_LOADING_ALL_POSTS;
export const SUCCESS_FETCHING_ALL_POSTS = fetchAllPostsActions.SUCCESS_FETCHING_ALL_POSTS;
export const FAILURE_FETCHING_ALL_POSTS = fetchAllPostsActions.FAILURE_FETCHING_ALL_POSTS;
export const fetchAllPosts = fetchAllPostsActions.fetchAllPosts;

// FETCH POST BY ID
const post_by_id_url = `${process.env.REACT_APP_BACKEND}/posts/:id`;

const fetchPostByIdActions = getFetchingActionCreators('post_by_id', post_by_id_url);

export const IS_LOADING_POST_BY_ID = fetchPostByIdActions.IS_LOADING_POST_BY_ID;
export const SUCCESS_FETCHING_POST_BY_ID = fetchPostByIdActions.SUCCESS_FETCHING_POST_BY_ID;
export const FAILURE_FETCHING_POST_BY_ID = fetchPostByIdActions.FAILURE_FETCHING_POST_BY_ID;
export const fetchPostById = fetchPostByIdActions.fetchPostById;

// VOTE
export const VOTE_FOR_POST = 'VOTE_FOR_POST';
export const voteForPost = getActionCreator(VOTE_FOR_POST); // {id: [post.id], option: 'upVote'|'downVote'}

// FETCH POSTS BY CATEGORY
const posts_by_category_url = `${process.env.REACT_APP_BACKEND}/:category/posts`;

const fetchPostsByCategoryActions = getFetchingActionCreators('posts_by_category', posts_by_category_url);

export const IS_LOADING_POSTS_BY_CATEGORY = fetchPostsByCategoryActions.IS_LOADING_POSTS_BY_CATEGORY;
export const SUCCESS_FETCHING_POSTS_BY_CATEGORY = fetchPostsByCategoryActions.SUCCESS_FETCHING_POSTS_BY_CATEGORY;
export const FAILURE_FETCHING_POSTS_BY_CATEGORY = fetchPostsByCategoryActions.FAILURE_FETCHING_POSTS_BY_CATEGORY;
export const fetchPostsByCategory = fetchPostsByCategoryActions.fetchPostsByCategory;

export const postsFetchingActions = {
  [GET_ALL_POSTS]: fetchAllPosts,
  [GET_POSTS_BY_CATEGORY]: fetchPostsByCategory,
  [GET_POST_BY_ID]: fetchPostById
}