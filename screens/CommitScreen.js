import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, FlatList, Button, Image } from 'react-native';
import { Provider } from "react-redux";
import { Card } from 'react-native-elements';
import Modal from 'react-native-modal';
import CommitModal from '../components/CommitModal'


export default function Commits({navigation}) {
  const repo = navigation.getParam('repo', null);
  const allCommitsUrl = String(repo.commits_url).replace('{/sha}', '');
  const [loading, setLoading] = useState(true);
  const [commits, setCommits] = useState([]);
  const [modalInfo, setModalInfo] = useState({
    showModal: false,
    commit: []
  });

  useEffect(() => {
    setTimeout(()=>{
      fetch(allCommitsUrl)
        .then((res) => res.json())
        .then((jsonRes) => {
          setCommits(jsonRes.slice(0, 10))
          setLoading(false);
        })
        .catch((error) => console.log(error));
      
    },1000);
  },[]);

  function getParsedDate(date) {
    date = String(date).split('T');
    splittedDate = String(date[0]).split('-');
    return splittedDate[2]+'.'+splittedDate[1]+'.'+splittedDate[0];
  }

  function handleModalClose() {
    setModalInfo({
      ...modalInfo,
      showModal: false,
    });
  }

  if(loading) {
    return(
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#000000' style={styles.indicator} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={commits}
          keyExtractor={item => item.sha}
          renderItem={({item}) => 
            <TouchableOpacity onPress={() => {
              setModalInfo({
                showModal: true,
                commit: item
              });
              }}>
              <Card>
                <View style={styles.flatList}>
                  <Text style={{fontSize: 20, borderBottomWidth:1, borderBottomColor:'gray'}}>{item.commit.committer.name}</Text>
                  <Text style={{fontSize: 13}}>{getParsedDate(item.commit.committer.date)}</Text>
                </View>
              </Card>
            </TouchableOpacity>}
        />
        {modalInfo.showModal &&
          <CommitModal commit={modalInfo.commit} handleClose={handleModalClose}></CommitModal>
        }
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
  indicator: {
    transform: [{scale: 3}],
  },
  flatList: {
    padding: 10,
    minHeight: 44,
    flex: 1,
    flexDirection: 'column',
   // justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'stretch',
  },
  modal: {
    alignContent: 'center',
  }
});

Commits.navigationOptions = ({navigation}) => ({
  headerTitle: 'Commits',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow:1,
    alignSelf:'center',
  },
})