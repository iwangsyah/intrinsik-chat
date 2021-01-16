import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Image, Text, View, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { ApiService } from '../../services';
import Images from '../../assets/images';
import Theme from '../../styles/Theme';
import { Navigation } from '../../configs';
import { Astorage } from '../../util';
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
  empty: {
    fontWeight: 'bold',
    color: Theme.txtTeritaryColor,
    textAlign: 'center',
    marginTop: 50
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: Theme.blue,
    resizeMode: 'contain'
  }
})


const Contacts = (props) => {
  const { navigation } = props;
  const [user, setUser] = useState({});
  const [contacts, setContacs] = useState([]);
  const [indicator, setIndicator] = useState(true);

  useEffect(() => {
    getContacts();
  }, [])

  const getContacts = async () => {
    const userData = JSON.parse(await Astorage.getUser());
    setUser(userData);
    const { email } = userData;
    const data = { email };
    ApiService.contacts(data)
      .then(response => {
        const { data } = response;
        setContacs(data);
        setIndicator(false);
      })
      .catch(error => setIndicator(false));
  }

  const renderItem = ({ item }) => {
    const username = item.username.split(' ');
    const random = Math.floor(Math.random() * Theme.colorList.length);
    return (
      <TouchableOpacity
        style={styles.content}
        onPress={() => navigation.navigate(Navigation.CHATDETAIL, { item, user, username })}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.titleContainer, { backgroundColor: Theme.colorList[random] }]}>
            <Text style={styles.title}>
              {username[0].charAt(0).toUpperCase()}
              {username[1] ? username[1].charAt(0).toUpperCase() : ''}
            </Text>
          </View>
          <Text style={styles.text}>{item.username}</Text>
        </View>
        <Image source={Images.icNext} style={styles.icon} />
      </TouchableOpacity >
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Theme.bgPrimaryColor} barStyle="dark-content" />
      <Header
        title='Contacts'
        txtRight='Log out'
        onPress={() => Actions.logout()}
      />
      <ActivityIndicator
        size="large"
        color={Theme.primaryColor}
        style={{ marginTop: 50, display: indicator ? 'flex' : 'none' }}
      />
      {!indicator &&
        <FlatList
          data={contacts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={() => <Text style={styles.empty}>Empty Data</Text>}
        />}
    </SafeAreaView >
  );
}

export default Contacts;
