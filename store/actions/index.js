export const requestRepos = () => ({
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

export const fetchRepos = (username) => {
  return function (dispatch) {
    dispatch(requestRepos());
    return fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((jsonRes) => {
        if(jsonRes.message === 'Not Found') {
          dispatch(notFoundRepos());
        } else {
          dispatch(receivedRepos(jsonRes));
        }
      })
      .catch((error) => console.log(error));
  }
}

export const requestCommits = () => ({
  type: 'REQUEST_COMMITS',
});

export const receivedCommits = (commits) => {
  return {
    type: 'RECEIVED_COMMITS',
    payload: commits
  }
};

export const notFoundCommits = () => {
  return {
    type: 'NOTFOUND_COMMITS',
  }
};

export const fetchCommits = (commitsUrl, signal) => {
  return function (dispatch) {
    dispatch(requestCommits())
    return fetch(commitsUrl, {signal})
    .then((res) => res.json())
    .then((jsonRes) => {
      if(jsonRes.message==='Git Repository is empty.'){
        dispatch(notFoundCommits())
      } else {
        dispatch(receivedCommits(jsonRes));
      }
    })
    .catch((error) => {console.log(error.name)});
  }
}

export const changeSearchValue = (value) => {
  return {
    type: 'CHANGE',
    payload: value
  }
};