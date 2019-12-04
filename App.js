import { createAppContainer } from 'react-navigation';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Search from './views/search/Search';
import Repositories from './views/repositories/Repositories';
import Commits from './views/commits/Commits';
import { Provider } from 'react-redux';
import store from './store/store';

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

const navigation = ({
  headerStyle: {
    backgroundColor:'#F0F0F0',
  },
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow:1,
    alignSelf:'center',
  },
})

const MainNavigation = createStackNavigator({
  Search: { screen: Search,
    navigationOptions: navigation
  },
  Repositories: { screen: Repositories,
    navigationOptions: navigation
  },
  Commits: { screen: Commits,
    navigationOptions: navigation
  },
});

const AppContainer = createAppContainer(MainNavigation);