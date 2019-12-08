import repositoryReducer from './repositoryReducer';
import searchReducer from './searchReducer';
import commitsReducer from '../reducers/commitsReducer'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
  repos: repositoryReducer,
  searchValue: searchReducer,
  commits: commitsReducer,
});

export default allReducers;