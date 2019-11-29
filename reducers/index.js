import responseReducer from './responseData';
import searchReducer from './searchValue';
import { combineReducers } from 'redux'

const allReducers = combineReducers({
  response: responseReducer,
  searchValue: searchReducer,
});

export default allReducers;