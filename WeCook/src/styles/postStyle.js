import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export const postStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8E892',
  },
  headerBar: {
    flexDirection: 'row',
    width: w,
    height: '6%',
  },
  closeIcon: {
    flex: 1,
    alignSelf: 'center',
    marginLeft: '2%',
  },
  box: {
    flex: 1,
    alignSelf: 'center',
  },
  buttonBox: {
    width: '55%',
    height: '80%',
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginRight: '5%',
  },
  buttonText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 18,
    color: '#51BC10',
  },
  body: {
    flex: 1,
    // paddingBottom: 60,
  },
  box1: {
    width: w,
    backgroundColor: '#fff',
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    width: w,
    height: h / 3.5,
  },
  header: {
    backgroundColor: '#B8E892',
    shadowColor: '#333',
    shadowOffset: {
      width: -1,
      height: -3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: '3%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  panel: {
    paddingBottom: '20%',
    backgroundColor: '#fff',
  },
  panelTitle: {
    fontSize: 27,
    fontFamily: 'Cabin-Regular',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: '2%',
  },
  panelButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '17%',
    borderRadius: 10,
    backgroundColor: '#B8E892',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontFamily: 'Cabin-Bold',
    color: '#fff',
  },
  boxName: {
    marginTop: '2%',
    width: '95%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#51BC10',
  },
  inputName: {
    fontFamily: 'Cabin-Bold',
    fontSize: 18,
  },
  boxDescribe: {
    marginTop: '2%',
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#51BC10',
  },
  inputDescribe: {
    fontFamily: 'Cabin-Regular',
    fontSize: 15,
  },
  boxRation: {
    marginTop: '2%',
    flexDirection: 'row',
  },
  textRation: {
    marginLeft: '2%',
    flex: 1,
    fontFamily: 'Cabin-Regular',
    fontSize: 15,
  },
  buttonRation: {
    marginRight: '2%',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  numberRation: {
    fontSize: 15,
    marginHorizontal: '10%',
  },
  boxPrepare: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRation: {
    flex: 1,
    marginLeft: '2%',
    fontFamily: 'Cabin-Regular',
    fontSize: 15,
  },
  boxTime: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '2%',
  },
  inputTime: {
    fontFamily: 'Cabin-Regular',
    fontSize: 15,
    textAlign: 'center',
  },
  textTime: {
    fontFamily: 'Cabin-Regular',
    fontSize: 15,
    marginLeft: '1%',
  },
  box2: {
    marginTop: '2%',
    width: w,
    backgroundColor: '#fff',
  },
  boxHeader: {
    marginBottom: '2%',
    marginLeft: '2%',
    fontFamily: 'Cabin-Regular',
    fontSize: 18,
  },
  ingredientBar: {
    alignItems: 'center',
    marginBottom: '5%',
    marginLeft: '2%',
    flexDirection: 'row',
  },
  inputIngredient: {
    width: '60%',
    borderBottomColor: '#51BC10',
    borderBottomWidth: 1,
    marginLeft: '2%',
    fontFamily: 'Cabin-Regular',
    color: '#000000',
    fontSize: 15,
  },
  boxQuantity: {
    width: '25%',
    backgroundColor: '#51BC10',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '3%',
  },
  inputQuantity: {
    fontFamily: 'Cabin-Regular',
    fontSize: 15,
    color: '#fff',
  },
  addButton: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  addText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
  },
  box3: {
    width: w,
    backgroundColor: '#fff',
    marginTop: '2%',
  },
  stepBar: {
    alignItems: 'center',
    marginLeft: '2%',
    flexDirection: 'row',
    marginTop: '2%',
    marginBottom: '2%',
  },
  stepBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#B8E892',
  },
  inputStep: {
    width: '100%',
    borderBottomColor: '#51BC10',
    borderBottomWidth: 1,
    fontFamily: 'Cabin-Regular',
    color: '#000000',
    fontSize: 15,
  },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: '5%',
  },
});
