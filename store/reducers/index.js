import { combineReducers } from 'redux';
import repositoryReducer from './repositoryReducer';
import searchReducer from './searchReducer';
import commitsReducer from '../reducers/commitsReducer';

const allReducers = combineReducers({
  repos: repositoryReducer,
  searchValue: searchReducer,
  commits: commitsReducer,
});

export default allReducers;
