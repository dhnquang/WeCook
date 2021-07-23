import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export const recipeStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: w,
    height: '8.5%',
    borderBottomColor: '#C4C4C4',
    backgroundColor: '#fff',
  },
  header: {
    fontFamily: 'Cabin-Medium',
    fontSize: 24,
    color: '#28B446',
    marginLeft: '2%',
  },
  searchBar: {
    marginTop: '4%',
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    marginBottom: '2%',
  },
  searchIcon: {
    flex: 1,
    marginLeft: '2%',
  },
  inputText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    flex: 9,
    color: '#fff',
  },
  text: {
    fontFamily: 'Cabin-Medium',
    fontSize: 24,
    marginLeft: '2%',
    marginBottom: '1%',
  },
  horizontalPost: {
    flex: 1,
  },
  recipe: {
    backgroundColor: '#fff',
    width: 200,
    height: 180,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  image: {
    width: 200,
    height: 120,
  },
  textBox: {
    flex: 1,
    flexDirection: 'row',
  },
  textInfo: {
    fontFamily: 'Cabin-Regular',
    color: '#6A6666',
    fontSize: 16,
    marginLeft: '2%',
  },
  textRecipe: {
    fontFamily: 'Cabin-Medium',
    fontSize: 18,
    marginLeft: '2%',
  },
  textView: {
    flex: 9,
    justifyContent: 'center',
  },
  info: {
    flexDirection: 'row',
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    marginRight: '2%',
  },
  recipeBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '96%',
    alignSelf: 'center',
    marginTop: '2%',
    marginBottom: '1%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  img: {
    width: 120,
    height: 120,
  },
  background: {
    width: w,
    height: h / 3,
    position: 'absolute',
  },
  infoBox: {
    width: '98%',
    flex: 1,
    paddingBottom: 10,
    borderWidth: 1,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: '55%',
  },
  titleText: {
    textAlign: 'center',
    fontFamily: 'Cabin-Medium',
    fontSize: 24,
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  subText: {
    marginLeft: '5%',
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    color: '#6A6666',
  },
  heading: {
    fontFamily: 'Cabin-Medium',
    fontSize: 20,
    marginBottom: '2%',
  },
  timeBox: {
    flexDirection: 'row',
    marginTop: '2%',
  },
  direction: {
    flexDirection: 'row',
  },
  ingredientBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
  },
  ingredientImgBox: {
    width: 90,
    height: 90,
    borderRadius: 50,
    shadowColor: '#24FF00',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  ingredientList: {
    paddingBottom: '5%',
  },
  stepBox: {
    marginBottom: '5%',
    width: '95%',
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
  textStep: {
    flex: 9,
    borderBottomColor: '#51BC10',
    borderBottomWidth: 1,
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
  },
  textIndex: {
    fontFamily: 'Cabin-Medium',
    color: '#fff',
  },
  nutritionText: {
    flex: 1,
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
  },
  nutritionInfo: {
    flex: 1,
    textAlign: 'right',
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
  },
  nutritionBox: {
    marginBottom: '5%',
  },
});
