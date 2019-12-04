import { createAppContainer } from 'react-navigation';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import SearchScreen from './views/search/SearchScreen'
import RepositoryScreen from './views/repositories/RepositoryScreen'
import CommitScreen from './views/commits/CommitScreen'
import { Provider } from 'react-redux';
import store from './store/store'

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    )
  }
}

const state = store.getState();

const MainNavigation = createStackNavigator({
  Search: { screen: SearchScreen },
  Repositories: { screen: RepositoryScreen },
  Commits: { screen: CommitScreen },
});

const AppContainer = createAppContainer(MainNavigation);