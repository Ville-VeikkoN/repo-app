import React, {Component, useEffect} from 'react';
import { FlatList,StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import store from '../store/store';
import { changeValue, fetchData } from '../actions';
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'react-native-elements';
import ImageModal from '../components/ImageModal'


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
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#000000' style={styles.indicator} />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.accountcontainer}>
          {!response.notfound && 
            <TouchableOpacity onPress={() => setShowImg(!showImg)}>
              <Image
                style={{width: 90, height: 90}}
                source={{uri: response.repos[0].owner.avatar_url}}
              />
            </TouchableOpacity>
          }
          <Text style={styles.username}>{searchValue}</Text>
        </View>
        <FlatList
          data={response.repos}
          keyExtractor={item => item.full_name}
          renderItem={({item}) => 
          <TouchableOpacity onPress={() => navigation.navigate('Commits', {repo: item})}>
            <Card>
              <View style={styles.flatlist}>
                <Text style={{fontSize: 18}}>{item.name}</Text>
                <Text style={{fontSize: 18}}>{getParsedDate(item.created_at)}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  accountcontainer: {
    alignItems: 'center',
  },
  indicator: {
    transform: [{scale: 3}],
  },
  flatlist: {
    padding: 10,
    minHeight: 44,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'stretch',
  },
  username: {
    fontSize: 20,
    marginBottom: 20,
  }
});

Repositories.navigationOptions = ({navigation}) => ({
  headerTitle: 'Repositories',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow:1,
    alignSelf:'center',
  },
})