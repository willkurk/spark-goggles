import React from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import SparkPropTypes from '../PropTypes/';
import ImageViewer from './ImageViewer';

const CallConnected = ({
  call,
  messages,
  onHangup,
  onTriggerSnapshot,
  style
}) => {
  return (
    <View style={[style, { flex: 1 }]}>
      <ImageViewer call={call} messages={messages} />
      <Button title="Send Snapshot" onPress={onTriggerSnapshot} />
      <Button title="Hangup call" onPress={onHangup} />
    </View>
  );
};

CallConnected.propTypes = {
  call: SparkPropTypes.call.isRequired,
  messages: SparkPropTypes.messages.isRequired,
  onTriggerSnapshot: PropTypes.func.isRequired,
  onHangup: PropTypes.func.isRequired,
  style: View.propTypes.style
};

export default CallConnected;
