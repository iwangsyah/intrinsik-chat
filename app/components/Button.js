import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Theme, ButtonStyle } from '../styles/';

export default function Button(props) {
  const {
    title,
    style,
    color,
    onPress,
    isTransparent
  } = props

  return (
    <TouchableOpacity
      style={[
        ButtonStyle.button,
        {
          borderColor: color ? color : Theme.primaryColor,
          backgroundColor: isTransparent ? 'transparent'
            : color ? color
              : Theme.primaryColor
        },
        isTransparent ? {} : Theme.shadow,
        style
      ]}
      onPress={onPress}
    >
      <Text
        style={[ButtonStyle.text, {
          color: isTransparent ? color
            ? color : Theme.primaryColor
            : Theme.txtSecondaryColor
        }]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
};