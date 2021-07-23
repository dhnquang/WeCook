import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export const postDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: '18%',
  },
  image: {
    width: w,
    height: h / 4,
    alignItems: 'flex-end',
  },
  body: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '1%',
  },
  headerText: {
    marginLeft: '2%',
    fontFamily: 'Cabin-Regular',
    fontSize: 24,
    flex: 8,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 2,
  },
  userBox: {
    marginTop: '1%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
  },
  avaContainer: {
    marginLeft: '2%',
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  ava: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
  },
  likeText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 15,
    marginLeft: '10%',
  },
  box: {
    marginBottom: '2%',
    paddingBottom: '2%',
    width: '95%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#51BC10',
  },
  info: {
    fontFamily: 'Cabin-Medium',
    fontSize: 20,
  },
  detail: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    marginLeft: '2%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
  },
  quantityText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
  },
  ingredientBox: {
    flexDirection: 'row',
    marginTop: '2%',
  },
  quantityBox: {
    alignItems: 'flex-end',
    flex: 1,
    marginRight: '2%',
  },
  stepBox: {
    width: '95%',
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  index: {
    flex: 1,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#B8E892',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '2%',
  },
  textIndex: {
    fontFamily: 'Cabin-Medium',
    color: '#fff',
  },
  textStep: {
    flex: 9,
    borderBottomColor: '#51BC10',
    borderBottomWidth: 1,
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
  },
});
