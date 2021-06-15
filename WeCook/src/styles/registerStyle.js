import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export const registerStyle = StyleSheet.create({
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
    marginTop: '5%',
  },
  bodyText: {
    fontSize: 25,
    fontFamily: 'Cabin-Regular',
    color: 'gray',
    alignSelf: 'center',
    marginBottom: '2%',
  },
  input: {
    marginTop: '3%',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    width: w,
    height: h / 21,
  },
  text: {
    fontFamily: 'Cabin-Bold',
    fontSize: 14,
    alignSelf: 'center',
    flex: 1,
    marginLeft: '2%',
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flex: 3,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
  },
  textBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '5%',
  },
  navText: {
    fontSize: 13,
    fontFamily: 'Cabin-Regular',
    color: '#FA620C'
  },
  registerButton: {
    marginTop: '5%',
    marginHorizontal: '15%',
    borderRadius: 20,
  },
  warning1: {
    fontFamily: 'Cabin-Regular',
    color: 'red',
    alignSelf: 'center',
    fontSize: 11
  },
  warning2: {
    fontFamily: 'Cabin-Regular',
    color: 'red',
    marginLeft: '28%',
    fontSize: 11
  }
});
