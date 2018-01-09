import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native';
import { default as NativeCamera, constants } from 'react-native-camera';

class Camera extends Component {
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
    return (
      <NativeCamera
        style={{ flex: 1 }}
        ref={this.handleRef}
        aspect={constants.Aspect.fill}
      >
        <Button title="Snapshot!" onPress={this.handlePress} />
      </NativeCamera>
    );
  }
}

Camera.propTypes = {
  onSnapshot: PropTypes.func.isRequired
};

export default Camera;
