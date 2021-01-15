import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Image, View, Text } from 'react-native';
import { InputText, Button } from '../../components';
import Images from '../../assets/images';
import Theme from '../../styles/Theme';

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

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          value={email}
        />
        <InputText
          title="Password"
          onChange={(text) => setPassword(text)}
          secureTextEntry
          value={password}
        />
        <Button title="Sign In" style={{ marginTop: 30 }} />
        <Button title="Sign Up" isTransparent style={{ marginTop: 10 }} />
      </View>
    </SafeAreaView>
  );
}

