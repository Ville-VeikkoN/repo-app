import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, FlatList, Button, Image } from 'react-native';
import { Provider } from "react-redux";
import { Card } from 'react-native-elements';
import Modal from 'react-native-modal';


export default class CommitModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const commit = this.props.commit;
    return (
      <View style={styles.container}>
        <Modal
          isVisible={true}
          animationIn='fadeIn'
          animationOut='fadeOut'
          hideModalContentWhileAnimating={true}
          backdropTransitionOutTiming={0}
          onBackdropPress={() => this.props.handleClose()}
          onBackButtonPress={() => this.props.handleClose()}>

          <Card title={commit.sha}>
            <View style={styles.modalcontent}>
              {commit.author != null && 
                <Image
                  style={styles.image}
                  source={{uri: commit.committer.avatar_url}}
                />
              }
              <Text style={{fontSize:13, borderBottomColor:'gray', borderBottomWidth:1}}>Commit Message</Text>
              <Text style={{fontSize:20, textAlign:'center'}}>{commit.commit.message}</Text>
              <TouchableOpacity onPress={() => this.props.handleClose()}>
                <Text style={{fontSize:18, color:'blue', marginTop:20}}>close</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </Modal>
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
  modalcontent: {
    alignItems: 'center',
    textAlign: 'center'
  },
  image: {
    height: 90,
    width: 90,
    marginBottom: 20,
  }
});



