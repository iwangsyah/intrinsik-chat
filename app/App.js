import React from 'react';
import _ from 'lodash';
import AppContainer from './containers/Router';
import { NavigationService } from './util';

import { Theme } from './styles';

console.disableYellowBox = true;

export default function App() {
  return (
    <AppContainer
      ref={
        (navigatorRef) =>
          NavigationService.setTopLevelNavigator(navigatorRef) // navigating-without-navigation-prop. ex: tap from notification
      }
    />
  );
}
