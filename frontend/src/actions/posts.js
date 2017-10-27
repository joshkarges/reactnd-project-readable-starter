import _ from 'lodash';
import { fetchCommentsByPost } from './comments';
import {
  getFetchingActionCreators,
} from './util';

// FETCH ALL POSTS
export const FETCH_ALL_POSTS = 'FETCH_ALL_POSTS';
const fetch_all_posts_url = `${process.env.REACT_APP_BACKEND}/posts`;
export const { ATTEMPTING_FETCH_ALL_POSTS, SUCCESS_FETCH_ALL_POSTS, FAILURE_FETCH_ALL_POSTS, fetchAllPosts } = getFetchingActionCreators(FETCH_ALL_POSTS, fetch_all_posts_url);

// FETCH POSTS BY CATEGORY
export const FETCH_POSTS_BY_CATEGORY = 'FETCH_POSTS_BY_CATEGORY';
const fetch_posts_by_category_url = `${process.env.REACT_APP_BACKEND}/:category/posts`;
export const { ATTEMPTING_FETCH_POSTS_BY_CATEGORY, SUCCESS_FETCH_POSTS_BY_CATEGORY, FAILURE_FETCH_POSTS_BY_CATEGORY, fetchPostsByCategory } = getFetchingActionCreators(FETCH_POSTS_BY_CATEGORY, fetch_posts_by_category_url);

// FETCH POST BY ID
export const FETCH_POST_BY_ID = 'FETCH_POST_BY_ID';
const fetch_post_by_id_url = `${process.env.REACT_APP_BACKEND}/posts/:id`;
export const { ATTEMPTING_FETCH_POST_BY_ID, SUCCESS_FETCH_POST_BY_ID, FAILURE_FETCH_POST_BY_ID, fetchPostById} = getFetchingActionCreators(FETCH_POST_BY_ID, fetch_post_by_id_url);

// VOTE
export const VOTE_FOR_POST = 'VOTE_FOR_POST';
const vote_for_post_url = `${process.env.REACT_APP_BACKEND}/posts/:id`;
export const { ATTEMPTING_VOTE_FOR_POST, SUCCESS_VOTE_FOR_POST, FAILURE_VOTE_FOR_POST, voteForPost } = getFetchingActionCreators(VOTE_FOR_POST, vote_for_post_url, 'POST'); // {id: [post.id], option: 'upVote'|'downVote'};

// ADD NEW POST
export const ADD_POST = 'ADD_POST';
const add_post_url = `${process.env.REACT_APP_BACKEND}/posts`;
export const { ATTEMPTING_ADD_POST, SUCCESS_ADD_POST, FAILURE_ADD_POST, addPost } = getFetchingActionCreators(ADD_POST, add_post_url, 'POST'); // {id: [post.id], ...post};

// DELETE POST
export const DELETE_POST = 'DELETE_POST';
const delete_post_url = `${process.env.REACT_APP_BACKEND}/posts/:id`;
export const { ATTEMPTING_DELETE_POST, SUCCESS_DELETE_POST, FAILURE_DELETE_POST, deletePost } = getFetchingActionCreators(DELETE_POST, delete_post_url, 'DELETE'); // {id: [post.id]};

// EDIT POST
export const EDIT_POST = 'EDIT_POST';
const edit_post_url = `${process.env.REACT_APP_BACKEND}/posts/:id`;
export const { ATTEMPTING_EDIT_POST, SUCCESS_EDIT_POST, FAILURE_EDIT_POST, editPost } = getFetchingActionCreators(EDIT_POST, edit_post_url, 'PUT'); // {id: [post.id], ...post};

export const fetchPostsWithCommentsActions = {
  [FETCH_ALL_POSTS]: wrapFetchPostActionWithComments(fetchAllPosts),
  [FETCH_POSTS_BY_CATEGORY]: wrapFetchPostActionWithComments(fetchPostsByCategory),
  [FETCH_POST_BY_ID]: wrapFetchPostActionWithComments(fetchPostById)
}

function wrapFetchPostActionWithComments(fpa) {
  return (opts)=>(
      (dispatch)=>(
        dispatch(fpa(opts))
        .then((posts) => {
          if (posts.failure) return;
          if (_.isArray(posts.data)) {
            return posts.data.forEach(p => dispatch(fetchCommentsByPost({ id: p.id })))
          } else {
            return dispatch(fetchCommentsByPost({ id: posts.data.id }))
          }
        })
      )
    );
}