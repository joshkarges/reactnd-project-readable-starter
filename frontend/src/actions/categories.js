import { getFetchingActionCreators } from './util';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
const fetch_categories_url = `${process.env.REACT_APP_BACKEND}/categories`;
export const { ATTEMPTING_FETCH_CATEGORIES, SUCCESS_FETCH_CATEGORIES, FAILURE_FETCH_CATEGORIES, fetchCategories } = getFetchingActionCreators(FETCH_CATEGORIES, fetch_categories_url)
