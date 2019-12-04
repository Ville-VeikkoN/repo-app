import { StyleSheet } from 'react-native';

const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: '50%'
    //justifyContent: 'center',
  },
  searchbutton : {
    color:'blue',
    fontSize: 20,
    fontWeight: 'bold'
  },
  searchbox: {
    height: 40,
    width: '95%',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingLeft: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  }
})

export default searchStyles;