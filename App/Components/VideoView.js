import React, { Component } from 'react';
import { requireNativeComponent, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const NativeVideoView = requireNativeComponent('VideoView', {
  name: 'VideoView',
  propTypes: {
    ...ViewPropTypes,
    onSnapshot: PropTypes.func
  }
});

class VideoView extends Component {
  handleSnapshot = event => {
    this.props.onSnapshot(event.nativeEvent);
  };

  render() {
    return <NativeVideoView {...this.props} onSnapshot={this.handleSnapshot} />;
  }
}

VideoView.propTypes = {
  ...ViewPropTypes,
  onSnapshot: PropTypes.func
};

export default VideoView;
