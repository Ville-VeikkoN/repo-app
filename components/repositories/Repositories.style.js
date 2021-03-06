import { StyleSheet } from 'react-native';

const repositoriesStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#d6e5fa',
    marginTop: 20,
    backgroundColor: '#fef6fb',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  accountContainer: {
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
  },
  image: {
    width: 90,
    height: 90,
  },
});

export default repositoriesStyle;
