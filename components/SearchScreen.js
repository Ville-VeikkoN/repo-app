import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Provider } from "react-redux";

export default class Search extends React.Component {
  static navigationOptions = {
    title: 'Search Repositories',
    headerTitleStyle: { alignSelf: 'center' },
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  onValueChange(e) {
    console.log(e);
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput value='Search' onChangeText={this.onValueChange()}></TextInput>
        <Button title='Search' onPress={()=>navigate('Repositories')}></Button>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    borderWidth: 4,
    borderColor: 'gray'
  }
});
