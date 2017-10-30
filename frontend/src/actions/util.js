import _ from 'lodash';

function parameterizeUrl(url, opts) {
  var parameterizedUrl = url;
  for (var key in opts) {
    parameterizedUrl = parameterizedUrl.replace(':' + key, opts[key]);
  }
  return parameterizedUrl;
}

export function getFetchingActionCreators(name, url, method) {
  let upperCaseName = name.toUpperCase();
  let attempting = getActionKeysAndCreator('ATTEMPTING_' + upperCaseName);
  let failure = getActionKeysAndCreator('FAILURE_' + upperCaseName);
  let success = getActionKeysAndCreator('SUCCESS_' + upperCaseName);
  return {
    ...getActionTypeAndCreatorFromKeys(attempting),
    ...getActionTypeAndCreatorFromKeys(failure),
    ...getActionTypeAndCreatorFromKeys(success),
    [_.camelCase(upperCaseName)]: (opts)=>{
      return (dispatch) => {
        dispatch(attempting.creator({ isAttempting: true }));
        method = method || 'GET';
        const parameterizedUrl = parameterizeUrl(url, opts);
        const fetchAttrs = {
          method: method,
          headers: {
            'Authorization': 'whatever-you-want',
            'Content-Type': 'application/json'
          },
        };
        if (method !== 'GET' && method !== 'HEAD') {
          fetchAttrs.body = JSON.stringify(opts)
        }
        return fetch(parameterizedUrl, fetchAttrs)
        .then((response) => {
          if (!response.ok) throw Error(response.statusText);
          dispatch(attempting.creator({ isAttempting: false }));
          return response;
        })
        .then(response => response.json())
        .then(data => dispatch(success.creator({ opts, data })))
        .catch((err) => {
          console.log(err)
          return dispatch(failure.creator({ failure: true }))
        });
      }
    }
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

//input: getActionKeysAndCreator('ATTEMPTING_BLAH')
//output: {ATTEMPTING_BLAH: 'ATTEMPTING_BLAH', attemptingBlah: <action creator>}
function getActionTypeAndCreatorFromKeys(kac) {
  return {
    [kac.CAP_SNAKE_CASE]: kac.CAP_SNAKE_CASE,
    [kac.camelCase]: kac.creator
  };
}

export function getActionCreator(type) {
  return ({ ...args }) => ({
    type: type,
    ...args
  });
}