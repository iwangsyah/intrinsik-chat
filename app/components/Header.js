import React from 'react';
import { Image, View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import Theme from '../styles/Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 100 : 60,
    backgroundColor: Theme.primaryColor,
    justifyContent: 'space-between', alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: Theme.fontSemiBold,
    color: Theme.txtWhite
  },
  icRight: {
    width: 60,
    alignItems: 'center',
    paddingRight: 5,
    paddingVertical: 10
  }
})

export default (Header = ({
  onBack,
  isBack,
  icRight,
  onPress,
  title
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      disabled={!isBack}
      style={{ padding: 24, width: 60 }}
      onPress={() => onBack()}>
      {/* <Image
          style={{ width: 12, display: isBack ? 'flex' : 'none' }}
          source={Images.icBack}
        /> */}
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity
      disabled={!icRight}
      style={styles.icRight}
      onPress={() => onPress()}
    >
      {icRight}
    </TouchableOpacity>
  </View>
));