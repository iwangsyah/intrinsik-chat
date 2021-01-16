import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  Text,
  View,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { ApiService } from '../../services';
import Images from '../../assets/images';
import Theme from '../../styles/Theme';
import { Navigation } from '../../configs';
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
  const [contacts, setContacs] = useState([]);
  const [indicator, setIndicator] = useState(true);

  useEffect(() => {
    getContacts();
  }, [])

  const getContacts = async () => {
    const { email } = props.user;
    const data = { email };
    setIndicator(true);
    ApiService.contacts(data)
      .then(response => {
        const { data } = response;
        setContacs(data);
        setIndicator(false);
      })
      .catch(error => setIndicator(false));
  }

  const onRefresh = () => {
    getContacts();
  }

  const renderItem = ({ item }) => {
    const username = item.username.split(' ');
    const random = Math.floor(Math.random() * Theme.colorList.length);
    return (
      <TouchableOpacity
        style={styles.content}
        onPress={() => navigation.navigate(Navigation.CHATDETAIL, { item, user: props.user, id: item.id, username: item.username })}
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
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Empty Data</Text>
          )}
          refreshControl={
            <RefreshControl
              refreshing={indicator}
              onRefresh={() => onRefresh()}
            />
          }
        />}
    </SafeAreaView >
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
