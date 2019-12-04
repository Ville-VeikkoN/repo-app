import React, {Component, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Button, Image, Alert } from 'react-native';
import store from '../../store/store';
import { changeValue, fetchData, getUsername, requestRepos } from '../../actions';
import { useDispatch, useSelector } from 'react-redux'
import { bold } from 'ansi-colors';
import KeepAwake, { useKeepAwake } from 'expo-keep-awake';

function Search({navigation}) {
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
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/Octocat.png')}></Image>
      <TextInput
        style={styles.searchbox} 
        value={searchValue} 
        placeholder='Enter GitHub account' 
        onChangeText={(e) => 
        onValueChange(e)}>
      </TextInput>
      <TouchableOpacity onPress={() => searchButtonPressed()}>
          <Text style={styles.searchbutton}>Search</Text>
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
  searchbutton : {
    color:'blue',
    fontSize: 20,
    fontWeight: 'bold'
  },
  searchbox: {
    height: 40,
    width: '95%',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingLeft: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  }
});

Search.navigationOptions = ({navigation}) => ({
  headerStyle: {
    backgroundColor:'#F0F0F0',
  },
  headerTitle: 'Search for user',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow:1,
    alignSelf:'center',
  },
});

export default Search;