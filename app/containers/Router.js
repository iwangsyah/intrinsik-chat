import React from 'react';
import { SafeAreaView, TouchableOpacity, Image, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack';
import { Navigation } from '../configs';
import Images from '../assets/images';
import * as Screen from '../screens';
import { Theme, BottomTabBar } from '../styles';

const HomeNavigation = createStackNavigator(
  {
    [Navigation.HOME]: Screen.Home,
    [Navigation.CHATDETAIL]: Screen.ChatDetail,
  },
  {
    headerMode: Navigation.HOME,
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }),
    navigationOptions: ({ navigation }) => ({
      headerVisible: false,
      tabBarVisible: navigation.state.index <= 0,
    }),
  },
);

const ContactsNavigation = createStackNavigator(
  {
    [Navigation.CONTACTS]: Screen.Contacts,
    [Navigation.CHATDETAIL]: Screen.ChatDetail,
  },
  {
    headerMode: Navigation.CONTACTS,
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }),
    navigationOptions: ({ navigation }) => ({
      headerVisible: false,
      tabBarVisible: navigation.state.index <= 0,
    }),
  },
);


const BottomNavigationHome = createBottomTabNavigator(
  {
    [Navigation.HOME]: {
      screen: HomeNavigation,
    },
    [Navigation.CONTACTS]: {
      screen: ContactsNavigation,
    },
  },
  {
    tabBarComponent: ({ navigation }) => (
      <SafeAreaView>
        <View style={BottomTabBar.container}>
          <TouchableOpacity
            style={BottomTabBar.tabBar}
            rippleCentered
            onPress={() => navigation.navigate(Navigation.HOME)}>
            <Image
              style={{
                width: 30,
                height: 30,
                tintColor:
                  navigation.state.index == 0
                    ? Theme.primaryColor
                    : Theme.lineColor,
              }}
              source={Images.icLogo}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={BottomTabBar.tabBar}
            rippleCentered
            onPress={() => navigation.navigate(Navigation.CONTACTS)}>
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor:
                  navigation.state.index == 1
                    ? Theme.primaryColor
                    : Theme.lineColor,
              }}
              source={Images.icContacts}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    ),
    initialRouteName: Navigation.HOME,
    tabBarOptions: {
      activeTintColor: Theme.primaryColor,
      inactiveTintColor: Theme.teritaryColor,
      style: BottomTabBar.container,
      labelStyle: BottomTabBar.label,
    },
    transitionConfig: () => ({
      // screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
  },
);

const AppStack = createStackNavigator(
  {
    Home: BottomNavigationHome,
  },
  {
    headerMode: Navigation.HOME,
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Screen.Login,
    },
  },
  {
    headerMode: Navigation.LOGIN,
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const Routes = createSwitchNavigator(
  {
    [Navigation.AUTHLOADING]: Screen.AuthLoadingScreen,
    [Navigation.AUTH]: AuthStack,
    [Navigation.APP]: AppStack,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AppContainer = createAppContainer(Routes);

export default AppContainer;
