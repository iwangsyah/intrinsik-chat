import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Theme from '../../styles/Theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.primaryColor,
  }
});


export default function AuthLoadingScreen(props) {

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Auth')
    }, 1000)
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
      />
    </View>
  );
}