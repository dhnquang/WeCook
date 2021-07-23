import React, {useEffect, useState, useCallback} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import Submit from 'react-native-vector-icons/FontAwesome';
import Scroll from 'react-native-vector-icons/FontAwesome';

import {chatStyle} from '../styles/chatStyle';

export default function ChatDetail() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#51BC10',
          },
          left: {
            backgroundColor: '#fff',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <Submit
            name="send"
            color="#51BC10"
            size={25}
            style={{marginBottom: 6, marginRight: 6}}
          />
        </View>
      </Send>
    );
  };

  const renderLoading = () => {
    return(
      <View style={[chatStyle.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size='large' color='#28B446'/>
      </View>
    );
  }

  const scrollToBottomComponent = () => {
    return <Scroll name="angle-double-down" size={30} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
    />
  );
}
