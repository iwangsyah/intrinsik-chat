import { StyleSheet } from 'react-native';
import Theme from './Theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 60,
    backgroundColor: Theme.bgPrimaryColor,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    elevation: 25,
    shadowRadius: 10,
    shadowOpacity: 0.5,
    borderTopWidth: 0,
  },
  tabBar: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
    marginTop: 5,
    fontWeight: 'bold'
  }
});
