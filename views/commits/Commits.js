import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, FlatList, Button, Image } from 'react-native';
import { Provider } from "react-redux";
import { Card } from 'react-native-elements';
import Modal from 'react-native-modal';
import CommitModal from '../../components/commit/CommitModal';
import styles from '../../Styles';
import commitsStyle from './Commits.style';

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
    var isMounted = true;
    setTimeout(()=>{
      fetch(allCommitsUrl)
        .then((res) => res.json())
        .then((jsonRes) => {
          if(isMounted) {
            setCommits(jsonRes.slice(0, 10))
            setLoading(false);
          }
        })
        .catch((error) => console.log(error));
      
    },1000);

    return function cleanup() {
      isMounted = !isMounted;
    }
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
      <View style={commitsStyle.container}>
        <Text style={styles.infoText}>Click wanted commit to see more</Text>
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
                  <Text style={styles.cardTitle}>{item.commit.author.name}</Text>
                  <Text style={{fontSize: 13}}>{getParsedDate(item.commit.author.date)}</Text>
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

Commits.navigationOptions = ({navigation}) => ({
  headerTitle: navigation.getParam('repo', 'Commits').name,
});