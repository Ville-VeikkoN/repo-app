import React from 'react';
import { FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Card } from 'react-native-elements';
import ImageModal from '../image/ImageModal';
import styles from '../../Styles';
import repositoriesStyle from './Repositories.style';
import { selectRepositories } from '../../store/reducers/repositoryReducer';
import { getParsedDate } from '../../helpers/dateHelper'

export default function Repositories(props) {
  const [showImg, setShowImg] = React.useState(false);
  let response = useSelector(selectRepositories);

  function handleModalClose() {
    setShowImg(false);
  }

  function flatListHeader () {
    const reposAmount = response.repos.length;
    return  (
      <View style={repositoriesStyle.accountContainer}>
        {reposAmount > 0 &&
          <TouchableOpacity onPress={() => setShowImg(!showImg)}>
            <Image
              style={{width: 90, height: 90}}
              source={{uri: response.repos[0].owner.avatar_url}}
            />
          </TouchableOpacity>
        }
        <Text style={styles.infoText}>Found {reposAmount} repositories</Text>
      </View>
    );
  }

  return (
    <View style={repositoriesStyle.container}>
      <FlatList
        data={response.repos}
        keyExtractor={item => item.full_name}
        ListHeaderComponent = {flatListHeader()}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => props.onClickRepo(item)}>
          <Card containerStyle={styles.cardContainer}>
            <View style={styles.flatList}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.dateText}>{getParsedDate(item.created_at)}</Text>
            </View>
          </Card>
        </TouchableOpacity>
        }
      />
      {showImg && <ImageModal uri={response.repos[0].owner.avatar_url} handleClose={handleModalClose}></ImageModal>}
    </View>
  );
}