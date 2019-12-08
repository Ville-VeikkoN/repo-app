const repositoryReducer = (state = [], action) => {
  switch(action.type) {
    case 'REQUEST_REPOS':
      return { 
        ...state,
        repos: [],
        dataFound: false,
        loading: true,
        dataNotFound: false,
      };
    case 'RECEIVED_REPOS':
      return {
        ...state,
        repos: action.payload,
        dataFound: true,
        loading: false,
        dataNotFound: false,
      };
    case 'NOTFOUND_REPOS': 
      return { 
        ...state,
        repos: [],
        dataFound: false,
        loading: false,
        dataNotFound: true,
      };
    default:
      return state;
  }
}

export const selectRepositories = (state) => state.repos;

export default repositoryReducer;