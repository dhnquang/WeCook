import {StyleSheet} from 'react-native';

export const tabStyle = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // shadow: {
  //   top: -35,
  //   shadowColor: 'black',
  //   shadowOffset: {
  //     width: 0,
  //     height: 20,
  //   },
  //   shadowOpacity: 1,
  //   shadowRadius: 5,
  //   elevation: 20,
  // },
  // PostView: {
  //   width: 70,
  //   height: 70,
  //   borderRadius: 35,
  //   backgroundColor: '#B8E892',
  // },

  // container: {
  //   flex: 1
  // },
  
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // SHADOW
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6,
    elevation: 10
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 30,
    height: 55
  },
});
