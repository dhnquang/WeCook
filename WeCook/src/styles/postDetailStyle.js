import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export const postDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: w,
    height: h / 3.5,
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
		marginBottom: '2%'
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
		fontSize: 16
	},
	likeText: {
		fontFamily: 'Cabin-Regular',
		fontSize: 15,
		marginLeft: '10%'
	},
	box: {
		marginBottom: '5%',
		width: '95%',
		alignSelf: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#51BC10'
	},
	info: {
		fontFamily: 'Cabin-Regular',
		fontSize: 18,
	}
});
