import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image, View, Text, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { InputText, Indicator, Button } from '../../components';
import { ApiService } from '../../services';
import Images from '../../assets/images';
import Theme from '../../styles/Theme';
import Actions from '../../actions';
import { Navigation } from '../../configs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.bgPrimaryColor
  },
  containerLogo: {
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 80
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
    tintColor: Theme.secondaryColor
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.txtTeritaryColor,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Theme.txtPrimaryColor,
  }
})

const Login = (props) => {

  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [indicatorMode, setIndicatorMode] = useState('loading');
  const [indicatorText, setIndicatorText] = useState('Loading...');

  const resetIndicator = () => {
    setTimeout(() => {
      setIndicator(false);
      setIndicatorMode('loading');
      setIndicatorText('Loading...');
    }, 1000)
  }

  const setIndicatorFailed = (title) => {
    setIndicatorMode('failed');
    setIndicatorText(title);
    resetIndicator();
  }

  const onRegister = () => {
    const data = { email, username, password };
    if (email && username && password) {
      setIndicator(true);
      ApiService.register(data)
        .then(response => {
          const { data } = response;
          if (data[0] && data[0].email === email) {
            setIndicatorFailed('Email already registered');
          } else {
            setIndicatorFailed('Register Success');
            navigation.navigate(Navigation.LOGIN);
          }
        })
        .catch(error => {
          console.log('err: ', error);
          setIndicatorFailed('Failed')
        });
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView extraHeight={20} extraScrollHeight={20} enableOnAndroid style={[styles.container, {
        paddingHorizontal: 50
      }]}>
        <View style={styles.containerLogo}>
          <Image source={Images.icLogo} style={styles.logo} />
          <Text style={styles.text}>Intrinsik OMS</Text>
        </View>
        <Text style={styles.title}>Sign Up</Text>
        <InputText
          title="Username"
          onChange={(text) => setUsername(text)}
          value={username}
        />
        <InputText
          title="Email"
          onChange={(text) => setEmail(text)}
          keyboardType="email-address"
          value={email.toLowerCase()}
        />
        <InputText
          title="Password"
          onChange={(text) => setPassword(text)}
          secureTextEntry
          value={password}
        />
        <Button
          title="Sign Up"
          style={{ marginTop: 30 }}
          onPress={() => onRegister()}
        />
        <Button
          title="Sign In"
          isTransparent
          style={{ marginTop: 10 }}
          onPress={() => {
            navigation.navigate(Navigation.LOGIN);
          }}
        />
      </KeyboardAwareScrollView>
      <Indicator
        visible={indicator}
        mode={indicatorMode}
        title={indicatorText}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => {
    dispatch(Actions.setUser(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

