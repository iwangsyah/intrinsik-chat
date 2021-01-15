import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Theme from '../../styles/Theme'
import { ApiService } from '../../services';

export default class AuthLoadingScreen extends React.Component {

  async componentWillMount() {
    // const authToken = await Astorage.getAuthToken();
    // console.log('auth: ', authToken);

    // if (authToken) {
    //   this.props.navigation.navigate('App')
    // } else {
    //   this.props.navigation.navigate('Auth')
    // }
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('App')
    }, 1000)
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.primaryColor,
  }
});
