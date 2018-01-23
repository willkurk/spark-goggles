import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import SparkPropTypes from '../PropTypes/';
import ImageViewer from './ImageViewer';
import Button from '../Components/Button';
import styles from './Styles/CallConnectedStyles';

const CallConnected = ({
  call,
  messages,
  onHangup,
  onTriggerSnapshot,
  style
}) => {
  return (
    <View style={style}>
      <ImageViewer call={call} messages={messages} />

      <View style={styles.callConnectedButtons}>
        <Button
          style={styles.callConnectedButton}
          icon="ios-camera-outline"
          onPress={onTriggerSnapshot}
        />

        <Button
          style={styles.callConnectedButton}
          icon="ios-close-outline"
          onPress={onHangup}
          type="alert"
        />
      </View>
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
