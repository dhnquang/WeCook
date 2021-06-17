import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export const feedStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
  },
  headerBar: {
    alignItems:'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: w,
    borderColor: '#C4C4C4',
    backgroundColor: '#fff',
    paddingBottom: '1%',
  },
  header: {
    fontFamily: 'Cabin-Regular',
    fontSize: 24,
    color: '#28B446',
    marginLeft: '1%',
    alignSelf: 'center',
  },
  footer: {
    flex: 1,
  },
  feedBox: {
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    marginTop: '2%',
    width: '95%',
    // height: h / 3.7,
    backgroundColor: '#fff',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  postImage: {
    width: '100%',
    height: h / 5.5,
    borderRadius: 15,
  },
  infoBox: {
    flexDirection: 'row',
    flex: 3,
    // backgroundColor: 'blue',
  },
  text: {
    fontFamily: 'Cabin-Regular',
    fontSize: 13,
    color: '#6A6666',
    marginLeft: '2%',
  },
  timeBox: {
    flex: 1,
    alignItems: 'flex-end',
    // backgroundColor: 'red',
  },
  textTime: {
    fontFamily: 'Cabin-Regular',
    fontSize: 13,
    color: '#6A6666',
    marginRight: '5%',
  },
  avaBox: {
    marginLeft: '2%',
    height: 45,
    width: 45,
    borderRadius: 25,
    flex: 1,
  },
  ava: {
    height: 45,
    width: 45,
    borderRadius: 25,
  },
  textBox: {
    alignSelf: 'center', 
    marginLeft: '3%', 
    flex: 5,
  },
  buttonBox: {
    flex: 2,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  heart: {
    marginLeft: '2%',
  },
  title: {
    fontFamily: 'Cabin-Medium',
    fontSize: 17,
  },
  userName: {
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
});
