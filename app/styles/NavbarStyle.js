import { StyleSheet, Platform } from 'react-native';
import DefaultStyles from './Theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: DefaultStyles.mainColor,
    justifyContent: 'space-between',
    height: 50,
    flexDirection: 'row'
  },
  childContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  shadow: {
    shadowColor: 'rgba(119, 117, 117, 0.8)',
    shadowOffset: {
      width: 0,
      height: 3.5
    },
    elevation: 3.5,
    shadowRadius: 4,
    shadowOpacity: 0.5
  },
  icon: { width: 30, height: 30, marginRight: 16, tintColor: DefaultStyles.icBar },
  title: {
    fontSize: 16,
    color: DefaultStyles.secondaryColor,
    alignSelf: 'center'
  },
  menu: {
    backgroundColor: DefaultStyles.mainColor,
    alignSelf: 'center',
    height: 50,
    width: 50
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: DefaultStyles.icBar
  }
});
