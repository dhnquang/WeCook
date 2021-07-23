import {StyleSheet, Dimensions, BackHandler} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export const searchStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    width: w,
    height: '8.5%',
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBox: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    flexDirection: 'row',
    height: h/21,
    borderRadius: 6,
  },
  searchIcon: {
    flex: 1,
    marginLeft: '2%'
  },
  inputText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    flex: 9,
    color: '#fff'
  },
  recentText: {
    marginLeft: '5%',
    marginTop: '2%',
    fontFamily: 'Cabin-Medium',
    fontSize: 20,
  },
  footer: {
    flex: 1,
    backgroundColor: '#E3EECA'
  },
  body: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
    marginBottom: '2%',
    alignSelf: 'center',
  },
  ava: {
    height: 45,
    width: 45,
    borderRadius: 25,
  },
  recipeText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    flex: 1,
    marginLeft: '5%',
  },
  userText: {
    fontFamily: 'Cabin-Regular',
    color: 'gray',
    fontSize: 14,
    flex: 1,
    marginLeft: '5%',
  }
})