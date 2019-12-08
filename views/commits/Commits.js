import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-native-elements';
import CommitModal from '../../components/commit/CommitModal';
import styles from '../../Styles';
import commitsStyle from './Commits.style';
import { getParsedDate } from '../../helpers/dateHelper';
import { selectCommits } from '../../store/reducers/commitsReducer';
import { fetchCommits } from '../../store/actions';

export default function Commits({ navigation }) {
  const AbortController = window.AbortController;
  const controller = new AbortController();
  const dispatch = useDispatch();
  const repo = navigation.getParam('repo', null);
  const allCommitsUrl = String(repo.commits_url).replace('{/sha}', '');
  const [loading, setLoading] = useState(true);
  const commits = useSelector(selectCommits);
  const [modalInfo, setModalInfo] = useState({
    showModal: false,
    commit: [],
  });

  useEffect(() => {
    const signal = controller.signal;

    dispatch(fetchCommits(allCommitsUrl, signal));
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    return function cleanup() {
      controller.abort();
    };
  }, []);

  function handleModalClose() {
    setModalInfo({
      ...modalInfo,
      showModal: false,
    });
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000000" style={styles.indicator} />
      </View>
    );
  } else {
    const commitsData = commits.commits.slice(0, 10);
    return (
      <View style={commitsStyle.container}>
        <Text style={styles.infoText}>{commitsData.length} commits</Text>
        <FlatList
          data={commitsData}
          keyExtractor={item => item.sha}
          initialNumToRender={10}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setModalInfo({
                  showModal: true,
                  commit: item,
                });
              }}>
              <Card containerStyle={styles.cardContainer}>
                <View style={styles.flatList}>
                  <Text style={styles.cardTitle}>{item.commit.author.name}</Text>
                  <Text style={styles.dateText}>{getParsedDate(item.commit.author.date)}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
        {modalInfo.showModal && (
          <CommitModal commit={modalInfo.commit} handleClose={handleModalClose} />
        )}
      </View>
    );
  }
}

Commits.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam('repo', 'Commits').name,
});
