import React from 'react';
import { View, TextInput, Image, Keyboard, ActivityIndicator } from 'react-native';
import store from '../../store/store';
import { changeSearchValue, fetchRepos } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useKeepAwake } from 'expo-keep-awake';
import searchStyles from './Search.style';
import Repositories from '../../components/repositories/Repositories'
import { selectRepositories } from '../../store/reducers/repositoryReducer'
import { Feather } from '@expo/vector-icons';

export default function Search({navigation}) {
  const dispatch = useDispatch();
  const repos = useSelector(selectRepositories);
  const searchValue = useSelector(state => state.searchValue);
  const [touched, setTouched] = React.useState(false);

  useKeepAwake();

  function onValueChange(e) {
    setTouched(false);
    dispatch(changeSearchValue(e));
  }

  function searchButtonPressed() {
    setTouched(true);
    if(searchValue !== '') {
      dispatch(fetchRepos(searchValue));
      Keyboard.dismiss();
    }
  }

  function onClickRepo(repository) {
    navigation.navigate('Commits', {repo: repository})
  }

  return (
    <View style={searchStyles.viewContainer}>
      <Image style={searchStyles.image} source={require('../../assets/Octocat.png')}></Image>
      <View style={searchStyles.container}>
        <TextInput
          style={touched && repos.dataNotFound ? searchStyles.inputInvalid :  searchStyles.input} 
          value={searchValue} 
          placeholder='Enter GitHub account' 
          onChangeText={(e) => onValueChange(e)}
          onSubmitEditing={() => searchButtonPressed()}
        />
        {repos.loading && <ActivityIndicator size='large' color='#000000' style={searchStyles.indicator}/>} 
        <Feather name='search' size={38} style={searchStyles.searchButton} onPress={() => searchButtonPressed()}/>
      </View>
      {repos.dataFound && <Repositories onClickRepo={onClickRepo}/>}
    </View>
  );
}

Search.navigationOptions = ({navigation}) => ({
  headerTitle: 'Search for user',
});
