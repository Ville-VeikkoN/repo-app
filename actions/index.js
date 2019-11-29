export const requestRepos = (username) => ({
  type: 'REQUEST_REPOS',
});

export const receivedRepos = (repos) => {
  return {
    type: 'RECEIVED_REPOS',
    payload: repos
  }
};

export const notFoundRepos = () => {
  return {
    type: 'NOTFOUND_REPOS',
  }
};

export function fetchData(username) {
  return function (dispatch) {
    dispatch(requestRepos());
    return fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((jsonRes) => {
        setTimeout(() => {
          if(jsonRes.message === 'Not Found') {
            dispatch(notFoundRepos());
          } else {
            dispatch(receivedRepos(jsonRes));
          }
        }, 1500);
      })
      .catch((error) => console.log(error));
  }
}

export const changeValue = (value) => {
  return {
    type: 'CHANGE',
    payload: value
  }
};