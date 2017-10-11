import {
  getFetchingActionCreators,
  getActionCreator
} from './util';

export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';
export const GET_POST_BY_ID = 'GET_POST_BY_ID';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';

// FETCH ALL POSTS
const all_posts_url = `${process.env.REACT_APP_BACKEND}/posts`;

const postsFetchAllActions = getFetchingActionCreators('all_posts', all_posts_url);

export const IS_LOADING_ALL_POSTS = postsFetchAllActions.IS_LOADING_ALL_POSTS;
export const SUCCESS_FETCHING_ALL_POSTS = postsFetchAllActions.SUCCESS_FETCHING_ALL_POSTS;
export const FAILURE_FETCHING_ALL_POSTS = postsFetchAllActions.FAILURE_FETCHING_ALL_POSTS;
export const fetchAllPosts = postsFetchAllActions.fetchAllPosts;

// FETCH POST BY ID
const post_by_id_url = `${process.env.REACT_APP_BACKEND}/posts/:id`;

const postsFetchByIdActions = getFetchingActionCreators('post_by_id', post_by_id_url);

export const IS_LOADING_POST_BY_ID = postsFetchByIdActions.IS_LOADING_POST_BY_ID;
export const SUCCESS_FETCHING_POST_BY_ID = postsFetchByIdActions.SUCCESS_FETCHING_POST_BY_ID;
export const FAILURE_FETCHING_POST_BY_ID = postsFetchByIdActions.FAILURE_FETCHING_POST_BY_ID;
export const fetchPostById = postsFetchByIdActions.fetchPostById;

// VOTE
export const VOTE_FOR_POST = 'VOTE_FOR_POST';
export const voteForPost = getActionCreator(VOTE_FOR_POST); // {id: [post.id], option: 'upVote'|'downVote'}