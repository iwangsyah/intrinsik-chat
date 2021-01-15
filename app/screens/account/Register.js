import React from 'react';
import { StyleSheet, Dimensions, SafeAreaView, Text, View } from 'react-native';
import Theme from '../../styles/Theme';

const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height / 3,
    paddingHorizontal: 33
  },
  txtLupaPassword: {
    fontSize: 12,
    fontFamily: Theme.fontBold,
    color: Theme.primaryColor,
    alignSelf: 'flex-end'
  },
  txtRegister: {
    fontSize: 12,
    fontFamily: Theme.fontRegular,
    color: Theme.primaryColor,
    alignSelf: 'center',
    marginBottom: 50,
  },
})

export default function Login() {
  return (
    <SafeAreaView>
      <View />
    </SafeAreaView>
  );
}

