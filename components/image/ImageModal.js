import React from 'react';
import { View, Image } from 'react-native';
import Modal from 'react-native-modal';
import imageModalStyle from './ImageModal.style'


export default class ImageModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={imageModalStyle.container}>
        <Modal
          isVisible={true}
          animationIn='fadeIn'
          animationOut='fadeOut'
          hideModalContentWhileAnimating={true}
          backdropTransitionOutTiming={0}
          onBackdropPress={() => this.props.handleClose()}
          onBackButtonPress={() => this.props.handleClose()}>
          <View style={imageModalStyle.modalcontent}>
            <Image
                style={imageModalStyle.image}
                source={{ uri: this.props.uri }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}



