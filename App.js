import { createAppContainer } from 'react-navigation';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Search from './views/search/Search';
import Repositories from './components/repositories/Repositories';
import Commits from './views/commits/Commits';
import { Provider } from 'react-redux';
import store from './store/store';
import 'abortcontroller-polyfill';

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
    backgroundColor:'#46b3e6',
  },
  headerTitleStyle: {
    flexGrow:1,
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