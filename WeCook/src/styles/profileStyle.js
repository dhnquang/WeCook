import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    width: w,
    height: '6%',
    backgroundColor: '#B8E892',
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
  cover: {
    width: w,
    flex: 1,
  },
  boxIcon: {
    marginTop: '2%',
    flexDirection: 'row',
  },
  menuIcon: {
    flex: 1,
    alignItems: 'flex-start',
  },
  editIcon: {
    flex: 1,
    alignItems: 'flex-end',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avaContainer: {
    height: 140,
    width: 140,
    borderRadius: 70,
    // justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 20,
  },
  avatar: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
  username: {
    justifyContent: 'flex-start',
    fontFamily: 'Cabin-Medium',
    fontSize: 24,
  },
  userBio: {
    fontFamily: 'Cabin-Regular',
    color: '#676767',
    fontSize: 20,
  },
  footer: {
    flex: 1.5,
    paddingBottom: 60,
  },
  avaView: {
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#51BC10',
  },
  changeText: {
    marginTop: '5%',
    fontFamily: 'Cabin -Regular',
    fontSize: 18,
    color: '#51BC10',
    marginBottom: '5%',
  },
  infoBar: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#51BC10',
    borderBottomWidth: 1,
  },
  infoText: {
    fontFamily: 'Cabin-Regular',
    flex: 2,
    fontSize: 15,
  },
  infoInput: {
    flex: 8,
    fontFamily: 'Cabin-Regular',
    fontSize: 15,
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
  imgBox: {
    width: w / 3,
    height: w / 3,
    borderWidth: 1,
    borderColor: '#000000',
  },
  imgPost: {
    width: w / 3,
    height: w / 3,
  },
  logoutButton: {
    marginTop: '10%',
    alignSelf: 'center',
    width: '40%',
    height: h / 20,
    backgroundColor: '#B8E892',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 11,
  },
  logoutText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 20,
    color: '#fff',
  },
});
