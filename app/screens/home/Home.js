import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Keyboard, ScrollView, StyleSheet, Image, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import io from 'socket.io-client';
import { InputText, Button } from '../../components';
import Images from '../../assets/images';
import Theme from '../../styles/Theme';
import { ApiService } from '../../services';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Theme.bgPrimaryColor
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#0A84FF',
    resizeMode: 'contain'
  },
  txtBack: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A84FF'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Theme.txtTeritaryColor
  },
  chatBox: {
    maxWidth: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: Theme.primaryColor,
    marginBottom: 16,
    borderRadius: 15,
    borderWidth: 3,
    padding: 8,
  },
  chatText: {
    fontSize: 12,
    maxWidth: '70%',
    marginRight: 16,
    fontWeight: 'bold',
    marginVertical: 5
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  input: {
    flex: 1,
    height: 60,
    marginHorizontal: 12,
    color: Theme.txtPrimaryColor
  },
  lineSeparator: {
    height: 3,
    width: '100%',
    backgroundColor: Theme.lineColor
  }
})


export default function Home() {

  const [isOpen, setIsOpen] = useState(false);
  const [isBottom, setIsBottom] = useState(true);
  const keyboardShowListener = useRef(null);
  const keyboardHideListener = useRef(null);
  const scrollViewRef = useRef();

  const [chat, setChat] = useState('');
  const [chatList, setChatList] = useState([
    { id: 1, message: 'ini chat pertama' },
    { id: 2, message: 'ini chat kedua' },
    { id: 2, message: 'ini chat ketiga' },
    { id: 1, message: 'ini chat keempat pesan ini sangan panjang sekali jadi akan menurun kebawah karena wrap' },
    { id: 1, message: 'ini chat pertama' },
    { id: 2, message: 'ini chat kedua' },
    { id: 2, message: 'ini chat ketiga' },
    { id: 1, message: 'ini chat keempat pesan ini sangan panjang sekali jadi akan menurun kebawah karena wrap' },
    { id: 1, message: 'ini chat pertama' },
    { id: 2, message: 'ini chat kedua' },
    { id: 2, message: 'ini chat ketiga' },
    { id: 1, message: 'ini chat keempat pesan ini sangan panjang sekali jadi akan menurun kebawah karena wrap' },
  ]);

  useEffect(() => {
    keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () => setIsOpen(true));
    keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => setIsOpen(false));
    const socket = io("http://127.0.0.1:3000");
    socket.on("chat message", msg => {
      console.log('msg: ', msg);
    });
    if (isOpen && isBottom) {
      scrollViewRef.current.scrollToEnd({ animated: true })
    }
    return () => {
      keyboardShowListener.current.remove();
      keyboardHideListener.current.remove();
    }
  });

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 60;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity style={styles.header}>
          <Image source={Images.icBack} style={styles.icon} />
          <Text style={styles.txtBack}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>John Smith</Text>
        <View style={styles.lineSeparator} />
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        enableOnAndroid
      >
        <ScrollView style={styles.container}
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current.scrollToEnd({ animated: false })
          }}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              console.warn("Reached end of page");
              setIsBottom(true);
            } else {
              setIsBottom(false);
            }
          }}>
          {chatList.map((item) => (
            <View style={[styles.chatBox, {
              alignSelf: item.id === 1 ? 'flex-end'
                : 'flex-start',
              backgroundColor: item.id === 1 ? Theme.bgPrimaryColor
                : Theme.primaryColor
            }]}>
              <Text style={[styles.chatText, {
                color: item.id === 1 ? Theme.primaryColor
                  : Theme.txtSecondaryColor,
              }]}>
                {item.message}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text
                  style={{
                    fontSize: 11,
                    marginRight: 5,
                    color: item.id === 1 ? Theme.txtTeritaryColor
                      : Theme.lineColor
                  }}
                >
                  10:11
              </Text>
                <Image
                  source={Images.icTicks}
                  style={{
                    width: 15,
                    height: 15,
                    tintColor: item.is_read ? Theme.blue
                      : Theme.txtTeritaryColor,
                    display: item.id === 1 ? 'flex'
                      : 'none'
                  }}
                />
              </View>
            </View>
          ))}
        </ScrollView>
        <View>
          <View style={styles.lineSeparator} />
          <View style={styles.inputContainer}>
            <Image
              source={Images.icAttachment}
              style={[styles.icon, {
                tintColor: Theme.secondaryColor
              }]}
            />
            <TextInput
              placeholder="Type here..."
              autoCorrect={false}
              style={styles.input}
              onChangeText={(text) => setChat(text)}
            />
            <Image
              source={Images.icSend}
              style={[styles.icon, {
                tintColor: Theme.primaryColor
              }]}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}

