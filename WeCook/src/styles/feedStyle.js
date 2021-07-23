import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export const feedStyle = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 65,
    backgroundColor: '#E3EECA',
  },
  headerBar: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: w,
    height: '8%',
    borderBottomColor: '#C4C4C4',
    backgroundColor: '#fff',
    paddingBottom: '1%',
  },
  header: {
    fontFamily: 'Cabin-Medium',
    fontSize: 24,
    color: '#28B446',
    marginLeft: '1%',
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
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 6,
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
    fontSize: 14,
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
  menu: {
    alignSelf: 'center',
    marginLeft: '1%',
  },
  user: {
    flexDirection: 'row',
    marginBottom: '1%',
  },
  filterButton: {
    width: '30%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  filterText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 18,
    color: '#28B446',
  },
  filterView: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
