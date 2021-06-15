import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export const searchStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    width: w,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    backgroundColor: '#fff'
  },
  searchBox: {
    alignSelf: 'center',
    marginVertical: '2%',
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
    fontSize: 15,
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
    flex: 1
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