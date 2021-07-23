import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';

import {chatStyle} from '../styles/chatStyle';

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/avatar/ava.png'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/avatar/HLE_0063.png'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/avatar/user-profile.png'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  // {
  //   id: '4',
  //   userName: 'Selina Paul',
  //   userImg: require('../assets/avatar/ava.png'),
  //   messageTime: '1 day ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '5',
  //   userName: 'Christy Alex',
  //   userImg: require('../assets/avatar/ava.png'),
  //   messageTime: '2 days ago',
  //   messageText:
  //     'Hey there, this is my test.',
  // },
];

export default function Chat({navigation}) {
  return (
    <View style={chatStyle.container}>
      <FlatList
        data={Messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('Chat', {userName: item.userName})} style={chatStyle.chatBox}>
            <Image
              source={item.userImg}
              resizeMode='cover'
              style={chatStyle.ava}
            />
            <View style={chatStyle.textSection}>
              <View style={chatStyle.userInfoText}>
                <Text style={chatStyle.username}>{item.userName}</Text>
                <Text style={chatStyle.postTime}>{item.messageTime}</Text>
              </View>
              <Text style={chatStyle.message}>{item.messageText}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
