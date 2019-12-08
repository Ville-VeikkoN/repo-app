import { StyleSheet } from 'react-native';

const searchStyles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fef6fb',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  searchButton : {
    marginRight: 10,
    marginLeft: 10,
  },
  input: {
    height: 40,
    flex:1,
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft: 10,
    paddingLeft:10,
  },
  inputInvalid: {
    height: 40,
    flex:1,
    borderWidth: 2,
    borderColor: 'red',
    marginLeft: 10,
    paddingLeft:10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  indicator: {
    position: 'absolute',
    right: 60,
  }
})

export default searchStyles;