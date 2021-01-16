import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from '../reducers';

const persistConfig = {
  key: 'root2',
  storage: AsyncStorage,
  whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [];

if (__DEV__) {
  // middlewares.push(createLogger());
}

const store = createStore(
  persistedReducer,
  undefined,
  compose(applyMiddleware(...middlewares))
);

const persistor = persistStore(store);

pausePersistor = () => {
  if (persistor) {
    persistor.pause();
  }
};

clearPersistor = () => {
  if (persistor) {
    persistor.purge();
  }
};

export default {
  store,
  persistor,
  pausePersistor,
  clearPersistor
};
