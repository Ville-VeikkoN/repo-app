import React, {Component, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Button, Image, Alert } from 'react-native';
import store from '../../store/store';
import { changeValue, fetchData, getUsername, requestRepos } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { bold } from 'ansi-colors';;
import KeepAwake, { useKeepAwake } from 'expo-keep-awake';
import searchStyles from './Search.style';

export default function Search({navigation}) {
  const dispatch = useDispatch();
  const searchValue = useSelector(state => state.searchValue);
  useKeepAwake();

  function onValueChange(e) {
    dispatch(changeValue(e));
  }

  function searchButtonPressed() {
    const state = store.getState();
    if(state.searchValue !== '') {
      dispatch(fetchData(state.searchValue));
      navigation.navigate('Repositories', {searchValue:state.searchValue});
    } else {
      alert('Please Enter Username');
    }
  }

  return (
    <View style={searchStyles.container}>
      <Image style={searchStyles.image} source={require('../../assets/Octocat.png')}></Image>
      <TextInput
        style={searchStyles.searchbox} 
        value={searchValue} 
        placeholder='Enter GitHub account' 
        onChangeText={(e) => 
        onValueChange(e)}>
      </TextInput>
      <TouchableOpacity onPress={() => searchButtonPressed()}>
          <Text style={searchStyles.searchbutton}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

Search.navigationOptions = ({navigation}) => ({
  headerTitle: 'Search for user',
});
