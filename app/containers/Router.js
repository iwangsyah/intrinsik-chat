import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as Screen from '../screens';

const AppStack = createStackNavigator(
  {
    Home: Screen.Home,
  },
  {
    headerMode: 'Home',
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
    headerMode: 'Login',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const Routes = createSwitchNavigator(
  {
    AuthLoading: Screen.AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack,
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
