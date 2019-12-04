import React, {Component, useEffect} from 'react';
import { FlatList,StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import store from '../../store/store';
import { changeValue, fetchData } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-native-elements';
import ImageModal from '../../components/image/ImageModal';
import styles from '../../Styles';
import repositoriesStyle from './Repositories.style';

export default function Repositories({navigation}) {
  const dispatch = useDispatch();
  const [showImg, setShowImg] = React.useState(false);
  let response = useSelector(state => state.response);
  let searchValue = useSelector(state => state.searchValue);

  useEffect(() => {
    if(response.notfound) {
      alert('Username Not Found');
      navigation.goBack();
    }
  });

  function getParsedDate(date) {
    date = String(date).split('T');
    splittedDate = String(date[0]).split('-');
    return splittedDate[2]+'.'+splittedDate[1]+'.'+splittedDate[0];
  }

  function handleModalClose() {
    setShowImg(false);
  }

  if(response.loading) {
    return(
      <View style={repositoriesStyle.container}>
        <ActivityIndicator size='large' color='#000000' style={styles.indicator} />
      </View>
    )
  } else {
    return (
      <View style={repositoriesStyle.container}>
        <View style={repositoriesStyle.accountContainer}>
          {!response.notfound && 
            <TouchableOpacity onPress={() => setShowImg(!showImg)}>
              <Image
                style={{width: 90, height: 90}}
                source={{uri: response.repos[0].owner.avatar_url}}
              />
            </TouchableOpacity>
          }
          <Text style={repositoriesStyle.username}>{searchValue}</Text>
          <Text style={styles.infoText}>Click wanted repository to see commits</Text>
        </View>
        <FlatList
          data={response.repos}
          keyExtractor={item => item.full_name}
          renderItem={({item}) => 
          <TouchableOpacity onPress={() => navigation.navigate('Commits', {repo: item})}>
            <Card>
              <View style={styles.flatList}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={{fontSize: 13}}>{getParsedDate(item.created_at)}</Text>
              </View>
            </Card>
          </TouchableOpacity>
          }
        />
        {showImg && <ImageModal uri={response.repos[0].owner.avatar_url} handleClose={handleModalClose}></ImageModal>}
      </View>
    );
  }
}

Repositories.navigationOptions = ({navigation}) => ({
  headerTitle: navigation.getParam('searchValue', 'Repositories'),
});