import React, {Component, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Button, Image, Alert } from 'react-native';
import store from '../store/store';
import { changeValue, fetchData, getUsername, requestRepos } from '../actions';
import { useDispatch, useSelector } from 'react-redux'

function Search({navigation}) {
  const dispatch = useDispatch();
  const searchValue = useSelector(state => state.searchValue);

  useEffect(() => {

  });

  function onValueChange(e) {
    dispatch(changeValue(e));
  }

  function searchButtonPressed() {
    const state = store.getState();
    if(state.searchValue !== '') {
      dispatch(fetchData(state.searchValue));
      navigation.navigate('Repositories');
    } else {
      alert('Please Enter Username');
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/Octocat.png')}></Image>
      <TextInput
        style={styles.searchBox} 
        value={searchValue} 
        placeholder='Enter GitHub account' 
        onChangeText={(e) => 
        onValueChange(e)}>
      </TextInput>
      <TouchableOpacity onPress={() => searchButtonPressed()}>
          <Text style={styles.searchButton}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: '50%'
    //justifyContent: 'center',
  },
  searchButton : {
    color:'blue',
    fontSize: 20,
  },
  searchBox: {
    height: 40,
    width: '95%',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  }
});

Search.navigationOptions = ({navigation}) => ({
  headerTitle: 'Search for user',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow:1,
    alignSelf:'center',
  },
});

export default Search;