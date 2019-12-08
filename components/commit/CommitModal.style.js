import { StyleSheet } from 'react-native';

const commitModalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  modalcontent: {
    alignItems: 'center',
    textAlign: 'center',
  },
  image: {
    height: 90,
    width: 90,
    marginTop: 10,
    marginBottom: 2,
  },
  closeText: {
    fontSize: 18,
    color: 'blue',
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 13,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default commitModalStyle;
