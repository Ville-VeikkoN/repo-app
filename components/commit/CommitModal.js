import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-elements';
import Modal from 'react-native-modal';
import commitModalStyle from './CommitModal.style'
import styles from '../../Styles';
import { getParsedDate } from '../../helpers/dateHelper'

export default class CommitModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const commit = this.props.commit;
    return (
      <View style={commitModalStyle.container}>
        <Modal
          isVisible={true}
          animationIn='fadeIn'
          animationOut='fadeOut'
          hideModalContentWhileAnimating={true}
          backdropTransitionOutTiming={0}
          onBackdropPress={() => this.props.handleClose()}
          onBackButtonPress={() => this.props.handleClose()}>
          <Card containerStyle={styles.cardContainer} title={getParsedDate(commit.commit.author.date)}>
            <View style={commitModalStyle.modalcontent}>
              {commit.author != null && 
                  <Image
                    style={commitModalStyle.image}
                    source={{uri: commit.author.avatar_url}}
                  />
              }
              <Text style={styles.username}>{commit.commit.author.name}</Text>
              <Text style={{fontSize:13, borderBottomColor:'gray', borderBottomWidth:1}}>Message</Text>
              <Text style={{fontSize:20, textAlign:'center'}}>{commit.commit.message}</Text>
              <TouchableOpacity onPress={() => this.props.handleClose()}>
                <Text style={commitModalStyle.closeText}>close</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </Modal>
      </View>
    );
  }
}



