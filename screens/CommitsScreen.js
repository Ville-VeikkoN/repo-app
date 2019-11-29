import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { Provider } from "react-redux";
import { Card } from 'react-native-elements';
import Modal from "react-native-modal";


export default function Commits({navigation}) {
  const repo = navigation.getParam('repo', null);
  const allCommitsUrl = String(repo.commits_url).replace('{/sha}', '');
  const [loading, setLoading] = useState(true);
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    setTimeout(()=>{
      fetch(allCommitsUrl)
        .then((res) => res.json())
        .then((jsonRes) => {
          setCommits(jsonRes)
          setLoading(false);
        })
        .catch((error) => console.log(error));
      
    },1500);
  },[]);

  function getParsedDate(date) {
    date = String(date).split('T');
    splittedDate = String(date[0]).split('-');
    return splittedDate[2]+'.'+splittedDate[1]+'.'+splittedDate[0];
  }

  if(loading) {
    return(
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#000000' style={styles.activityIndicator} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={commits}
          keyExtractor={item => item.sha}
          renderItem={({item}) => 
          <TouchableOpacity onPress={() => console.log('commit clicked')}>
            <Card>
              <View style={styles.flatList}>
                <Text style={{fontSize: 18}}>{item.commit.author.name}</Text>
                <Text style={{fontSize: 18}}>{getParsedDate(item.commit.author.date)}</Text>
              </View>
            </Card>
          </TouchableOpacity>
          }
        />
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
  activityIndicator: {
    transform: [{scale: 3}],
  },
  flatList: {
    padding: 10,
    height: 44,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'stretch',
  },
});

Commits.navigationOptions = ({navigation}) => ({
  headerTitle: 'Commits',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow:1,
    alignSelf:'center',
  },
  flatList: {
    padding: 10,
    height: 44,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignContent: 'stretch',
  },
})