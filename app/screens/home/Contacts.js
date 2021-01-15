import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import { ApiService } from '../../services';
import Images from '../../assets/images';
import Theme from '../../styles/Theme';
import { Navigation } from '../../configs';
import { Astorage } from '../../util';

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
  icon: {
    width: 40,
    height: 40,
    tintColor: Theme.blue,
    resizeMode: 'contain'
  }
})


const Contacts = (props) => {
  const { navigation } = props;
  const [contacts, setContacs] = useState([]);

  useEffect(() => {
    getContacts();
  }, [])

  const getContacts = async () => {
    const user = await Astorage.getUser();
    const { email } = JSON.parse(user);
    const data = { email };
    ApiService.contacts(data)
      .then(response => {
        const { data } = response;
        setContacs(data)
      })
      .catch(error => console.log(error));
  }

  const renderItem = ({ item }) => {
    const name = item.username.split(' ');
    const random = Math.floor(Math.random() * Theme.colorList.length);
    return (
      <TouchableOpacity
        style={styles.content}
        onPress={() => navigation.navigate(Navigation.CHATDETAIL)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.titleContainer, { backgroundColor: Theme.colorList[random] }]}>
            <Text style={styles.title}>
              {name[0].charAt(0).toUpperCase()}
              {name[1] ? name[1].charAt(0).toUpperCase() : ''}
            </Text>
          </View>
          <Text style={styles.text}>{item.username}</Text>
        </View>
        <Image source={Images.icNext} style={styles.icon} />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView >
  );
}

export default Contacts;
