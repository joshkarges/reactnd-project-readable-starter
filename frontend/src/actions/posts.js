import { getFetchingActionCreators } from './util';

// export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';
export const GET_POST_BY_ID = 'GET_POST_BY_ID';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_FOR_POST = 'VOTE_FOR_POST';
export const EDIT_POST = 'EDIT_POST';


const url = `${process.env.REACT_APP_BACKEND}/posts`;

const postsFetchActions = getFetchingActionCreators('posts', url);

export const FETCH_ALL_POSTS = postsFetchActions.FETCH_ALL_POSTS;
export const IS_LOADING_POSTS = postsFetchActions.IS_LOADING_POSTS;
export const SUCCESS_FETCHING_POSTS = postsFetchActions.SUCCESS_FETCHING_POSTS;
export const FAILURE_FETCHING_POSTS = postsFetchActions.FAILURE_FETCHING_POSTS;
export const fetchAllPosts = postsFetchActions.fetchAllPosts;