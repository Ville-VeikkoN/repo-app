import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './views/main/Main';
import Commits from './views/commits/Commits';
import store from './store/store';
import 'abortcontroller-polyfill';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const navigation = {
  headerStyle: {
    backgroundColor: '#46b3e6',
  },
  headerTitleStyle: {
    flexGrow: 1,
  },
};

const MainNavigation = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: navigation,
  },
  Commits: {
    screen: Commits,
    navigationOptions: navigation,
  },
});

const AppContainer = createAppContainer(MainNavigation);
