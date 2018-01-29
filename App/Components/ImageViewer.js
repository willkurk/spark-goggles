import React, { Component } from 'react';
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

class ImageViewer extends Component {
  state = {
    isReducedSize: false,
    image: null
  };

  handleDismissImage = () => {
    this.setState({ image: null });
  };

  handleResizeImage = () => {
    this.setState({ isReducedSize: !this.state.isReducedSize });
  };

  componentWillReceiveProps({ messages, call }) {
    const images = messages.data.filter(messageFilter(call));
    if (images.length) {
      this.setState({ image: images[images.length - 1].files[0] });
    }
  }

  render() {
    const { image } = this.state;

    if (!image) {
      return null;
    }

    const imageSizeStyle = this.state.isReducedSize
      ? styles.imageReducedSizeStyle
      : styles.imageFullSizeStyle;
    const imageResizeIcon = this.state.isReducedSize
      ? 'ios-expand-outline'
      : 'ios-contract-outline';

    return (
      <View style={styles.imageViewerContainer}>
        <Image
          style={[styles.imageViewerImage, imageSizeStyle]}
          source={image}
          key={image.uri}
          resizeMode="contain"
        />

        <View style={styles.imageViewerButtons}>
          <Button
            icon="ios-trash-outline"
            type="alert"
            onPress={this.handleDismissImage}
            style={styles.imageViewerButton}
          />

          <Button
            icon={imageResizeIcon}
            onPress={this.handleResizeImage}
            style={styles.imageViewerButton}
          />
        </View>
      </View>
    );
  }
}

ImageViewer.propTypes = {
  call: SparkPropTypes.call,
  messages: SparkPropTypes.messages.isRequired
};

export default ImageViewer;
