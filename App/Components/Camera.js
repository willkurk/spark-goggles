import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NativeModules, Button } from 'react-native';
import { default as NativeCamera, constants } from 'react-native-camera';

class Camera extends Component {
  componentDidMount() {
    NativeModules.Phone.setSendingVideo(false);
  }

  componentWillUnmount() {
    NativeModules.Phone.setSendingVideo(true);
  }

  handleRef = camera => {
    this.camera = camera;
  };

  handlePress = async () => {
    try {
      const picture = await this.camera.capture({ metadata: {} });
      this.props.onSnapshot(picture);
    } catch (error) {
      console.error('Camera failed:', error);
    }
  };

  render() {
    return [
      <NativeCamera
        key="camera"
        style={{ display: 'none' }}
        ref={this.handleRef}
        aspect={constants.Aspect.fill}
      />,
      <Button key="button" title="Snapshot!" onPress={this.handlePress} />
    ];
  }
}

Camera.propTypes = {
  onSnapshot: PropTypes.func.isRequired
};

export default Camera;
