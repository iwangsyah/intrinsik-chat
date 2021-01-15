import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Theme from '../styles/Theme';

// indicator mode
const loading = 'loading';
const success = 'success';
const failed = 'failed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3
  },
  title: {
    textAlign: 'center',
    fontSize: 14
  }
});

export default (Indicator = ({ title, style, visible, mode }) => {
  let newTitle;

  if (mode === failed) {
    newTitle = 'Failed';
  } else if (mode === success) {
    newTitle = '';
  } else {
    newTitle = 'Loading....';
  }

  if (title) {
    newTitle = title;
  }

  return (
    <View
      style={[
        styles.container,
        style,
        {
          position: visible ? 'absolute' : 'relative',
          display: visible ? 'flex' : 'none'
        }
      ]}
    >
      <View
        style={{ backgroundColor: '#ffffff', borderRadius: 4, padding: 16 }}
      >
        <ActivityIndicator
          size="large"
          color="#000000"
          style={{
            marginBottom: 8,
            display: mode === failed ? 'none' : 'flex'
          }}
        />
        <Text style={styles.title}>{newTitle}</Text>
      </View>
    </View>
  );
});

Indicator.defaultProps = {
  visible: true,
  mode: loading
};
