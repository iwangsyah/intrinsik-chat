import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Astorage, DateTimeUtil } from '../../util';
import { ApiService } from '../../services';
import Images from '../../assets/images';
import Theme from '../../styles/Theme';
import { Navigation } from '../../configs';
import { Header } from '../../components';
import Actions from '../../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.bgPrimaryColor
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: Theme.lineColor,
    justifyContent: 'space-between',
    padding: 16
  },
  titleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.txtSecondaryColor
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  message: {
    color: 'grey',
    marginLeft: 5
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: Theme.blue,
    resizeMode: 'contain'
  }
})


const Home = (props) => {
  const { navigation } = props;
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getChatRooms();
  }, [])

  const getChatRooms = async () => {
    const userData = JSON.parse(await Astorage.getUser());
    setUser(userData);
    const { id } = userData;
    const data = { id };
    ApiService.chatRooms(data)
      .then(response => {
        const { data } = response;
        setRooms(data)
      })
      .catch(error => console.log(error));
  }

  const renderItem = ({ item }) => {
    const username = user.username === item.username_1 ? item.username_2 : item.username_1;
    const name = username.split(' ');
    const random = Math.floor(Math.random() * Theme.colorList.length);
    return (
      <TouchableOpacity
        style={styles.content}
        onPress={() => navigation.navigate(Navigation.CHATDETAIL, { item, user, username })}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.titleContainer, { backgroundColor: Theme.colorList[random] }]}>
            <Text style={styles.title}>
              {name[0].charAt(0).toUpperCase()}
              {name[1] ? name[1].charAt(0).toUpperCase() : ''}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.text}>{username}</Text>
              <Text style={styles.message}>{DateTimeUtil.getChatTime(item.created_at)}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <Image
                source={Images.icTicks}
                style={{
                  width: 15,
                  height: 15,
                  tintColor: item.is_read ? Theme.blue
                    : Theme.txtTeritaryColor
                }}
              />
              <Text style={styles.message}>{item.message}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title='Chats'
        txtRight='Log out'
        onPress={() => Actions.logout()}
      />
      <FlatList
        data={rooms}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView >
  );
}

export default Home;
