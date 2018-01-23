import React from 'react';
import SparkPropTypes from '../PropTypes/';
import { View, Image } from 'react-native';
import Button from '../Components/Button';
import styles from './Styles/ImageViewerStyles';

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

const ImageViewer = ({ call, messages }) => {
  const images = messages.data.filter(messageFilter(call));

  if (!images.length) {
    return null;
  }

  return (
    <View style={styles.imageViewerContainer}>
      {images.map(message =>
        message.files.map(file => (
          <Image style={{ flex: 1 }} source={file} key={file.uri} />
        ))
      )}

      <View style={styles.imageViewerButtons}>
        <Button icon="ios-close-outline" type="alert" />
        <Button icon="ios-close-outline" type="alert" />
      </View>
    </View>
  );
};

ImageViewer.propTypes = {
  call: SparkPropTypes.call,
  messages: SparkPropTypes.messages.isRequired
};

export default ImageViewer;
