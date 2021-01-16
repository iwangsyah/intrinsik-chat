import React from 'react';
import { Image, View, Text, Platform, StyleSheet } from 'react-native';
import Theme from '../styles/Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: Theme.bgPrimaryColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.txtPrimaryColor
  },
  logout: {
    color: Theme.blue,
    fontWeight: 'bold'
  }
})

export default (Header = ({
  onPress,
  txtRight,
  title
}) => (
  <View style={[styles.container, Theme.shadow]}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.logout} onPress={onPress}>{txtRight}</Text>
  </View>
));