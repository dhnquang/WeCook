import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export const chatStyle = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#E3EECA'
  },
  chatBox: {
		width: '95%',
		alignItems: 'center',
		flexDirection: 'row',
		alignSelf: 'center',
		marginBottom: 5
  },
	ava: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	textSection: {
		flex: 1,
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: '#cccccc',
		padding: '2%'
	},
	userInfoText: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	username: {
		fontFamily: 'Cabin-Bold',
		fontSize: 15
	},
	postTime: {
		fontSize: 13,
		fontFamily: 'Cabin-Regular',
		color: '#6A6666'
	},
	message: {
		fontFamily: 'Cabin-Regular',
		fontSize: 15
	}
});
