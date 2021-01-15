import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image, View, Text } from 'react-native';
import { InputText, Indicator, Button } from '../../components';
import { ApiService } from '../../services';
import Images from '../../assets/images';
import Theme from '../../styles/Theme';
import { Astorage } from '../../util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
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

export default function Login(props) {

  const { navigation } = props;
  const [email, setEmail] = useState('');
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
    setIndicatorText('Data Not Found');
    resetIndicator();
  }

  const onLogin = () => {
    const data = { email, password };
    if (email && password) {
      setIndicator(true);
      ApiService.login(data)
        .then(response => {
          const { data } = response;
          if (data.length) {
            Astorage.setUser(data[0]);
            navigation.navigate('App');
          } else {
            setIndicatorFailed('Data Not Found');
          }
        })
        .catch(error => setIndicatorFailed('Failed'));
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image source={Images.icLogo} style={styles.logo} />
          <Text style={styles.text}>Intrinsik OMS</Text>
        </View>
        <Text style={styles.title}>Sign In</Text>
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
          title="Sign In"
          style={{ marginTop: 30 }}
          onPress={() => onLogin()}
        />
        <Button title="Sign Up" isTransparent style={{ marginTop: 10 }} />
      </View>
      <Indicator
        visible={indicator}
        mode={indicatorMode}
        title={indicatorText}
      />
    </SafeAreaView>
  );
}

