import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cover: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  body: {
    flex: 2,
  },
  headerText: {
    fontSize: 36,
    fontFamily: 'Cabin-Bold',
    alignSelf: 'center',
    marginTop: '10%',
  },
  bodyText: {
    fontSize: 25,
    fontFamily: 'Cabin-Regular',
    color: 'gray',
    alignSelf: 'center',
    marginBottom: '5%',
  },
  input: {
    marginTop: '5%',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    width: w,
    height: h / 20,
    // backgroundColor: 'red'
  },
  emailIcon: {
    alignSelf: 'center',
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginLeft: '5%',
    flex: 1,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
  },
  textBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '1%',
    marginRight: '5%',
  },
  text: {
    color: '#FA620C',
    fontSize: 13,
  },
  loginButton: {
    marginTop: '5%',
    marginHorizontal: '15%',
    borderRadius: 20,
  },
  navBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
  },
  navText: {
    fontSize: 18,
    fontFamily: 'Cabin-Medium',
    color: '#FA620C',
  },
  navText1: {
    fontSize: 18,
    fontFamily: 'Cabin-Medium',
  },
  warning: {
    fontFamily: 'Cabin-Regular',
    color: 'red',
    marginLeft: '17%',
    fontSize: 13
  }
});
