const searchReducer = (state = '', action) => {
    switch(action.type) {
      case 'CHANGE':
        return action.payload;
      default:
        return state;
    }
}

export const selectSearchValue = (state) => state.searchValue;

export default searchReducer;