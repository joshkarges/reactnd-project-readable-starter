import {
  FETCH_ALL_CATEGORIES,
  SUCCEED_FETCHING_CATEGORIES,
  FAIL_FETCHING_CATEGORIES,
  IS_LOADING_CATEGORIES
} from '../actions/categories';

const initialCategoriesState = {
  data: [],
  isLoading: false,
  hasErrored: false
}

export default function categories(state = initialCategoriesState, action) {
  switch (action.type) {
    case SUCCEED_FETCHING_CATEGORIES:
      return {
        ...state,
        data: action.categories
      };
    case FAIL_FETCHING_CATEGORIES:
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case IS_LOADING_CATEGORIES:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case FETCH_ALL_CATEGORIES:
    default:
      return state;
  }
}