import React from 'react';
import { View, TextInput, Image, Keyboard, ActivityIndicator } from 'react-native';
import { changeSearchValue, fetchRepos } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useKeepAwake } from 'expo-keep-awake';
import mainStyle from './Main.style';
import Repositories from '../../components/repositories/Repositories'
import { selectRepositories } from '../../store/reducers/repositoryReducer'
import { selectSearchValue } from '../../store/reducers/searchReducer'
import { Feather } from '@expo/vector-icons';

export default function Main({navigation}) {
  const dispatch = useDispatch();
  const repos = useSelector(selectRepositories);
  const searchValue = useSelector(selectSearchValue);
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
    <View style={mainStyle.viewContainer}>
      <Image style={mainStyle.image} source={require('../../assets/Octocat.png')}></Image>
      <View style={mainStyle.container}>
        <TextInput
          style={touched && repos.dataNotFound ? mainStyle.inputInvalid :  mainStyle.input} 
          value={searchValue} 
          placeholder='Enter GitHub account' 
          onChangeText={(e) => onValueChange(e)}
          onSubmitEditing={() => searchButtonPressed()}
        />
        {repos.loading && <ActivityIndicator size='large' color='#000000' style={mainStyle.indicator}/>} 
        <Feather name='search' size={38} style={mainStyle.searchButton} onPress={() => searchButtonPressed()}/>
      </View>
      {repos.dataFound && <Repositories onClickRepo={onClickRepo}/>}
    </View>
  );
}

Main.navigationOptions = ({navigation}) => ({
  headerTitle: 'Search for user',
});
