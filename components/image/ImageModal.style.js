import { StyleSheet } from 'react-native';

const imageModalStyle = StyleSheet.create({
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
  },
  image: {
    width: 350,
    height: 350
  }
});

export default imageModalStyle;