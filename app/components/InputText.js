import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import Theme from '../styles/Theme';

const styles = StyleSheet.create({
  container: {
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
  },
  title: {
    color: Theme.primaryColor,
    fontWeight: 'bold',
    marginBottom: 5
  },
  input: {
    flex: 1,
    fontSize: 16
  }
});

export default function InputText(props) {

  const [isFocused, setFocused] = useState(false);
  const {
    secureTextEntry,
    placeholderText,
    keyboardType,
    multiline,
    editable,
    onChange,
    title,
    value,
    style,
  } = props;

  return (
    <View style={[{ marginTop: 30 }, style]}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[
          styles.container,
          {
            borderColor: isFocused
              ? Theme.primaryColor
              : Theme.lineColor,
          },
        ]}>
        <TextInput
          editable={editable}
          multiline={multiline}
          keyboardType={keyboardType}
          placeholder={placeholderText}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={Theme.txtTeritaryColor}
          onChangeText={(text) => onChange(text)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={styles.input}
          returnKeyType="done"
          value={value}
        />
      </View>
    </View>
  );
}
