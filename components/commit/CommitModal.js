import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, FlatList, Button, Image } from 'react-native';
import { Provider } from "react-redux";
import { Card } from 'react-native-elements';
import Modal from 'react-native-modal';
import commitModalStyle from './CommitModal.style'


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

          <Card title={commit.sha}>
            <View style={commitModalStyle.modalcontent}>
            <Text style={{fontSize:13, borderBottomColor:'gray', borderBottomWidth:1}}>Author</Text>
              {commit.author != null && 
                  <Image
                    style={commitModalStyle.image}
                    source={{uri: commit.author.avatar_url}}
                  />
              }
              <Text style={{fontSize:20, marginBottom: 20}}>{commit.commit.author.name}</Text>
              <Text style={{fontSize:13, borderBottomColor:'gray', borderBottomWidth:1}}>Commit Message</Text>
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



