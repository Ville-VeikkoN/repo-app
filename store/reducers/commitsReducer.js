const commitsReducer = (state = [], action) => {
  switch (action.type) {
    case 'REQUEST_COMMITS':
      return {
        ...state,
        commits: [],
        loading: true,
        dataNotFound: false,
      };
    case 'RECEIVED_COMMITS':
      return {
        ...state,
        commits: action.payload,
        loading: false,
        dataNotFound: false,
      };
    case 'NOTFOUND_COMMITS':
      return {
        ...state,
        commits: [],
        loading: false,
        dataNotFound: true,
      };
    default:
      return state;
  }
};

export const selectCommits = state => state.commits;

export default commitsReducer;
