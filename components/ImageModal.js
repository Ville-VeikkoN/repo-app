import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, FlatList, Button, Image } from 'react-native';
import { Provider } from "react-redux";
import { Card } from 'react-native-elements';
import Modal from 'react-native-modal';


export default class ImageModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
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
          <View style={styles.modalcontent}>
            <Image
                style={{ width: 350, height: 350}}
                source={{ uri: this.props.uri }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalcontent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding : 10,
  }
});



