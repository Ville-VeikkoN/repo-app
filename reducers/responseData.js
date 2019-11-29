const responseReducer = (state = [], action) => {
  switch(action.type) {
    case 'REQUEST_REPOS':
      console.log('REQUEST');
      return { ...state, repos: [], notfound:false, loading: true };
    case 'RECEIVED_REPOS':
      console.log('RECEIVED');
      return { ...state, repos: action.payload, notfound:false, loading: false };
    case 'NOTFOUND_REPOS': 
      console.log('NOTFOUND');
      return { ...state, repos: [], notfound: true, loading: false };
    default:
      return state;
  }
}

export default responseReducer;