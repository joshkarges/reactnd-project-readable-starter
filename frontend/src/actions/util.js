import _ from 'lodash';

export function getActionCreator(type) {
  return ({ ...args }) => ({
    type: type,
    ...args
  });
}

export function getFetchingActionCreators(name, url) {
  let upperCaseName = name.toUpperCase();
  let loading = getActionKeysAndCreator('IS_LOADING_' + upperCaseName);
  let failure = getActionKeysAndCreator('FAILURE_FETCHING_' + upperCaseName);
  let success = getActionKeysAndCreator('SUCCESS_FETCHING_' + upperCaseName);
  return {
    ...getActionTypeAndCreator(loading),
    ...getActionTypeAndCreator(failure),
    ...getActionTypeAndCreator(success),
    [_.camelCase('FETCH_ALL_' + upperCaseName)]: () => {
      return (dispatch) =>  {
        dispatch(loading.creator({ isLoading: true }));
        fetch(url, { headers: { 'Authorization': 'whatever-you-want' } })
          .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            dispatch(loading.creator({ isLoading: false }));
            return response;
          })
          .then(response => response.json())
          .then(data => dispatch(success.creator({ data })))
          .catch(() => dispatch(failure.creator({ failure: true })))
      };
    }
  };
}


//input: getActionKeysAndCreator('IS_LOADING_BLAH')
//output: {IS_LOADING_BLAH: 'IS_LOADING_BLAH', isLoading: <action creator>}
function getActionTypeAndCreator(kac) {
  return {
    [kac.CAP_SNAKE_CASE]: kac.CAP_SNAKE_CASE,
    [kac.camelCase]: kac.creator
  };
}

function getActionKeysAndCreator(str) {
  const CAP_SNAKE_CASE = _.snakeCase(str).toUpperCase();
  const camelCase = _.camelCase(CAP_SNAKE_CASE);
  return {
    CAP_SNAKE_CASE: CAP_SNAKE_CASE,
    camelCase: camelCase,
    creator: getActionCreator(CAP_SNAKE_CASE)
  };
}