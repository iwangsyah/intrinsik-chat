import { NavigationActions } from 'react-navigation';

let navigator;

setTopLevelNavigator = navigatorRef => {
  navigator = navigatorRef;
};

navigate = (routeName, params) => {
  navigator &&
    navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    );
};

// add other navigation functions that you need and export them
export default {
  navigate,
  setTopLevelNavigator
};
