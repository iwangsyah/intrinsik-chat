import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import NavbarStyle from '../styles/NavbarStyle';

export default (NavBar = ({
  title,
  navIconVisible,
  menuVisible,
  shadowVisible,
  onPress,
  onPressMenu
}) => (
  <View
    style={[NavbarStyle.container, shadowVisible ? NavbarStyle.shadow : {}]}
  >
    <TouchableOpacity
      disabled={!navIconVisible}
      style={NavbarStyle.menu}
      onPress={onPress}
    >
    </TouchableOpacity>

    <Text style={NavbarStyle.title}>{title}</Text>

    <TouchableOpacity
      disabled={!menuVisible}
      style={NavbarStyle.menu}
      onPress={onPressMenu}
    >

    </TouchableOpacity>

  </View>
));
