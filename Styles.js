import { StatusBar, StyleSheet, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  infoText: {
    fontSize:13,
    color:'gray',
    textAlign:'center',
    padding:10
  },
  indicator: {
    transform: [{scale: 3}],
  },
  flatList: {
    padding: 10,
    minHeight: 44,
    flex: 1,
    flexDirection: 'column',
   // justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'stretch',
  },
  cardTitle: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor:'gray'
  }
});

export default styles;