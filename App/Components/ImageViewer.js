import React from 'react';
import SparkPropTypes from '../PropTypes/';
import { View, Image } from 'react-native';

const messageFilter = call => message => {
  if (!message.files || !message.files.length) {
    return false;
  }

  if (new Date(message.created) < call.connected) {
    return false;
  }

  if (!call.person || message.personEmail !== call.person.email) {
    return false;
  }

  return true;
};

const ImageViewer = ({ call, messages }) => (
  <View>
    {messages
      .filter(messageFilter(call))
      .map(message =>
        message.files.map(file => (
          <Image style={{ flex: 1 }} source={file} key={file.uri} />
        ))
      )}
  </View>
);

ImageViewer.propTypes = {
  call: SparkPropTypes.call,
  messages: SparkPropTypes.messages.isRequired
};

export default ImageViewer;
