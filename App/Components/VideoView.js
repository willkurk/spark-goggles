import React, { Component } from 'react';
import { requireNativeComponent, View, ViewPropTypes } from 'react-native';
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
    const { style, ...rest } = this.props;

    return (
      <View style={style}>
        <NativeVideoView
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          }}
          {...rest}
          onSnapshot={this.handleSnapshot}
        />
      </View>
    );
  }
}

VideoView.propTypes = {
  ...ViewPropTypes,
  onSnapshot: PropTypes.func
};

export default VideoView;
