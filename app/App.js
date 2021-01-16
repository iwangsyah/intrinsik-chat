import React from 'react';
import _ from 'lodash';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppContainer from './containers/Router';
import { NavigationService } from './util';
import Store from './util/Store';

import { Theme } from './styles';

console.disableYellowBox = true;

export default function App() {
  return (
    <Provider store={Store.store}>
      <PersistGate loading={null} persistor={Store.persistor}>
        <AppContainer
          ref={
            (navigatorRef) =>
              NavigationService.setTopLevelNavigator(navigatorRef) // navigating-without-navigation-prop. ex: tap from notification
          }
        />
      </PersistGate>
    </Provider>
  );
}
