import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import SearchScreen from './components/SearchScreen'
import RepositoriesScreen from './components/RepositoriesScreen'
import CommitsScreen from './components/CommitsScreen'
import OneCommitScreen from './components/OneCommitScreen'

const MainNavigation = createStackNavigator({
  Search: { screen: SearchScreen },
  Repositories: { screen: RepositoriesScreen },
  Commits: { screen: CommitsScreen },
  OneCommit: { screen: OneCommitScreen },
});



const App = createAppContainer(MainNavigation);

export default App; 