import React, {Component, useEffect} from 'react';
import { FlatList,StyleSheet, Text, View, TextInput, Button, Image, ActivityIndicator, Alert } from 'react-native';
import store from '../store/store';
import { changeValue, fetchData } from '../actions';
import { useDispatch, useSelector } from 'react-redux'

export default function Repositories({navigation}) {
  const dispatch = useDispatch();
  let response = useSelector(state => state.response);
  let search = useSelector(state => state.search);

  useEffect(() => {
    console.log(response);
    if(response.notfound) {
      alert('Username Not Found');
      navigation.goBack();
    }
  });

  if(response.loading) {
    return(
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#000000' style={styles.activityIndicator} />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text>Lista tähän</Text>
        <FlatList
          data={response.repos}
          keyExtractor={item => item.full_name}
          renderItem={({item}) => 
          <Text style={styles.item}>{item.full_name}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activityIndicator: {
    transform: [{scale: 3}],
  }
});

Repositories.navigationOptions = ({navigation}) => ({
  title: 'Repositories',
})