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
    ...getActionTypeAndCreatorFromKeys(loading),
    ...getActionTypeAndCreatorFromKeys(failure),
    ...getActionTypeAndCreatorFromKeys(success),
    [_.camelCase('FETCH_' + upperCaseName)]: (opts) => {
      return (dispatch) =>  {
        dispatch(loading.creator({ isLoading: true }));
        var parameterizedUrl = url;
        for (var key in opts) {
          parameterizedUrl = parameterizedUrl.replace(':' + key, opts[key]);
        }
        fetch(parameterizedUrl, { headers: { 'Authorization': 'whatever-you-want' } })
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

export function getActionTypeAndCreator(str) {
  const kac = getActionKeysAndCreator(str);
  return getActionTypeAndCreatorFromKeys(kac);
}

//input: getActionKeysAndCreator('IS_LOADING_BLAH')
//output: {IS_LOADING_BLAH: 'IS_LOADING_BLAH', isLoading: <action creator>}
function getActionTypeAndCreatorFromKeys(kac) {
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