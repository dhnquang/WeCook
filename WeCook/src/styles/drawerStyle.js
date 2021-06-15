import {StyleSheet, Dimensions} from 'react-native';

export const drawerStyle = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    justifyContent: 'center',
    paddingLeft: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingBottom: '3%'
  },
  title: {
    fontSize: 18,
    marginTop: "2%",
    fontFamily: 'Cabin-Medium',
    color: '#fff',
  },
  drawerSection: {
    marginTop: '5%',
  },
  bottomDrawerSection: {
    marginBottom: '5%',
    borderTopColor: '#fff',
    borderTopWidth: 1,
  },

  avaBox: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  ava: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
