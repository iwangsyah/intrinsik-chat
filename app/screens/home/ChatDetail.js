import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Keyboard, ScrollView, StyleSheet, StatusBar, TextInput, Image, View, Text, Platform, ActivityIndicator } from 'react-native';
import moment from 'moment';
import io from 'socket.io-client';
import Images from '../../assets/images';
import Theme from '../../styles/Theme';
import { ApiService } from '../../services';
import { DateTimeUtil } from '../../util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 5,
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
    borderWidth: 2,
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
    fontWeight: 'bold',
    marginHorizontal: 12,
    color: Theme.txtPrimaryColor
  },
  lineSeparator: {
    height: 3,
    width: '100%',
    backgroundColor: Theme.lineColor
  }
})


const ChatDetail = (props) => {

  const { navigation } = props;
  const { item, user, id, username } = navigation.state.params;

  const [isOpen, setIsOpen] = useState(false);
  const [isBottom, setIsBottom] = useState(true);
  const [indicator, setIndicator] = useState(true);
  const keyboardShowListener = useRef(null);
  const keyboardHideListener = useRef(null);
  const scrollViewRef = useRef();

  const [chat, setChat] = useState('');
  const [chatList, setChatList] = useState([]);
  const [room, setRoom] = useState(item.id_room ? item : {});



  const socket = io("https://obscure-temple-13039.herokuapp.com/");
  // const socket = io("http://127.0.0.1:3000");

  useEffect(() => {
    item.id_room ? getChatList(item) : getRoomChat();

    socket.on("chat message", message => {
      setChatList(prevChatList => [...prevChatList, message]);
      ApiService.sendChat(message)
        .then(response => {
          getChatList(room);
        })
        .catch(error => console.log(error));
    });
  }, [])


  const createChatRoom = () => {
    console.log('cretate');
    const data = {
      id_user_1: user.id,
      id_user_2: id,
      username_1: user.username,
      username_2: username,
      last_chat_id: 0
    }
    ApiService.createRoom(data)
      .then(response => {
        const { data } = response;
        setRoom(data[0]);
        setIndicator(false);
      })
      .catch(error => setIndicator(false));
  }

  const getRoomChat = () => {
    const data = {
      id_user_1: user.id,
      id_user_2: id
    }

    ApiService.getRoom(data)
      .then(response => {
        const { data } = response;
        console.log('r: ', data);
        if (data.length) {
          getChatList(data[0]);
          setRoom(data[0]);
        } else {
          console.log(2);
          createChatRoom();
        }
        setIndicator(false);
      })
      .catch(error => setIndicator(false));
  }

  const updateLastChat = async (item) => {
    const { id_chat, id_room } = item;
    const data = { id_chat, id_room };
    ApiService.updateLastChat(data)
      .then(response => {
        const { data } = response;
        setIndicator(false);
      })
      .catch(error => setIndicator(false));
  }

  useEffect(() => {
    keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', () => setIsOpen(true));
    keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', () => setIsOpen(false));
    if (isOpen && isBottom) {
      scrollViewRef.current.scrollToEnd({ animated: true })
    }
    return () => {
      keyboardShowListener.current.remove();
      keyboardHideListener.current.remove();
    }
  });

  const getChatList = async (data) => {
    const item = { id: data.id_room };
    ApiService.chatList(item)
      .then(response => {
        const { data } = response;
        if (data.length) {
          setChatList(data);
          if (data[data.length - 1].id_user !== user.id) {
            readChat(id);
          }
          updateLastChat(data[data.length - 1]);
        }
        setIndicator(false);
      })
      .catch(error => {
        console.log(error);
        setIndicator(false)
      });
  }

  const readChat = async (id) => {
    const data = { id };
    ApiService.sendReadChat(data)
      .then(() => { })
      .catch(error => console.log(error));
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 60;
  };

  const onSendMessage = () => {
    if (chat.trim()) {
      const created_at = moment().format('YYYY-MM-DD HH:mm:ss');
      let message = {
        id_room: room.id_room,
        id_user: user.id,
        type: 'text',
        data: null,
        message: chat,
        created_at
      };
      socket.emit("chat message", message)
      setChat('')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Theme.bgPrimaryColor} barStyle='dark-content' />
      <View>
        <TouchableOpacity style={styles.header} onPress={() => navigation.pop()}>
          <Image source={Images.icBack} style={styles.icon} />
          <Text style={styles.txtBack}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{username}</Text>
        <View style={styles.lineSeparator} />
      </View>
      <ActivityIndicator
        size="large"
        color={Theme.primaryColor}
        style={{ marginTop: 50, display: indicator ? 'flex' : 'none' }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : {}}
        style={{ flex: 1 }}
        enableOnAndroid
      >
        <ScrollView
          style={[styles.container, { padding: 16, paddingBottom: 50 }]}
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current.scrollToEnd({ animated: false })
          }}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              setIsBottom(true);
            } else {
              setIsBottom(false);
            }
          }}>
          {chatList.map((item, index) => (
            <View style={[styles.chatBox, {
              marginBottom: index == chatList.length - 1 ? 32 : 16,
              alignSelf: item.id_user === user.id ? 'flex-end' : 'flex-start',
              backgroundColor: item.id_user === user.id ? Theme.bgPrimaryColor : Theme.primaryColor
            }]}>
              <Text style={[styles.chatText, {
                color: item.id_user === user.id ? Theme.primaryColor : Theme.txtSecondaryColor,
              }]}>
                {item.message}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={{
                  fontSize: 11,
                  marginRight: 5,
                  color: item.id_user === user.id ? Theme.txtTeritaryColor : Theme.lineColor
                }} >
                  {DateTimeUtil.getChatTime(item.created_at)}
                </Text>
                <Image source={Images.icTicks} style={{
                  width: 15,
                  height: 15,
                  tintColor: item.is_read ? Theme.blue : Theme.txtTeritaryColor,
                  display: item.id_user === user.id ? 'flex' : 'none'
                }} />
              </View>
            </View>
          ))}
        </ScrollView>
        <View>
          <View style={styles.lineSeparator} />
          <View style={styles.inputContainer}>
            <TouchableOpacity>
              <Image
                source={Images.icAttachment}
                style={[styles.icon, {
                  tintColor: Theme.secondaryColor
                }]}
              />
            </TouchableOpacity>
            <TextInput
              onChangeText={(text) => setChat(text)}
              placeholder="Type here..."
              autoCorrect={false}
              style={styles.input}
              value={chat}
            />
            <TouchableOpacity onPress={() => onSendMessage()}>
              <Image
                source={Images.icSend}
                style={[styles.icon, {
                  tintColor: Theme.primaryColor
                }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}

export default ChatDetail;
