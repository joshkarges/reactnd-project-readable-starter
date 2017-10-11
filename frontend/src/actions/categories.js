import { getFetchingActionCreators } from './util';

const url = `${process.env.REACT_APP_BACKEND}/categories`;

const categoriesFetchActions = getFetchingActionCreators('categories', url);

export const IS_LOADING_CATEGORIES = categoriesFetchActions.IS_LOADING_CATEGORIES;
export const SUCCESS_FETCHING_CATEGORIES = categoriesFetchActions.SUCCESS_FETCHING_CATEGORIES;
export const FAILURE_FETCHING_CATEGORIES = categoriesFetchActions.FAILURE_FETCHING_CATEGORIES;
export const fetchCategories = categoriesFetchActions.fetchCategories;

// export const SUCCEED_FETCHING_CATEGORIES = 'SUCCEED_FETCHING_CATEGORIES';
// export const FAIL_FETCHING_CATEGORIES = 'FAIL_FETCHING_CATEGORIES';
// export const IS_LOADING_CATEGORIES = 'IS_LOADING_CATEGORIES';

// export const fetchAllCategories = ()  =>{
//   return (dispatch) =>  {
//     dispatch(isLoadingCategories(true));
//     const url = `${process.env.REACT_APP_BACKEND}/categories`;
//     fetch(url, { headers: { 'Authorization': 'whatever-you-want' } })
//       .then((response) => {
//         if (!response.ok) {
//             throw Error(response.statusText);
//         }
//         dispatch(isLoadingCategories(false));
//         return response;
//       })
//       .then(response => response.json())
//       .then(categories => dispatch(succeedFetchingCategories(categories)))
//       .catch(() => dispatch(failFetchingCategories(true)))
//   };
// };

// export const isLoadingCategories = (bool) => {
//   return {
//     type: IS_LOADING_CATEGORIES,
//     isLoading: bool
//   };
// };

// export const succeedFetchingCategories = (categories) => {
//   return {
//     type: SUCCEED_FETCHING_CATEGORIES,
//     ...categories
//   };
// };

// export const failFetchingCategories = (bool) => {
//   return {
//     type: FAIL_FETCHING_CATEGORIES,
//     hasErrored: bool
//   };
// };