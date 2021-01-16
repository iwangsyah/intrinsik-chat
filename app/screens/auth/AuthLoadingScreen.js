import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from '../../configs';
import Theme from '../../styles/Theme'
import { Astorage } from '../../util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.primaryColor,
  }
});


const AuthLoadingScreen = (props) => {
  useEffect(() => {
    checkUser();
  }, [])

  const checkUser = async () => {
    const navigate = props.user ? Navigation.APP
      : Navigation.AUTH;

    setTimeout(() => {
      props.navigation.navigate(navigate)
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
      />
    </View>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);