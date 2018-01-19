import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import SparkPropTypes from '../PropTypes/';
import Loading from '../Components/Loading';
import Button from '../Components/Button';
import styles from './Styles/CallRingingStyles';

const CallRinging = ({ call, onAccept, onReject, onHangup, style }) => {
  const renderContents = () => {
    if (!call.person.isInitiator) {
      return [
        <Loading key="loading" text={`Calling ${call.person.email}`} />,
        <View key="buttons" style={styles.callRingingButtons}>
          <Button
            style={styles.callRingingButton}
            icon="ios-close-outline"
            type="alert"
            label="Hangup"
            onPress={onHangup}
          />
        </View>
      ];
    }

    return [
      <Loading key="loading" text={`${call.person.email} is calling...`} />,
      <View key="buttons" style={styles.callRingingButtons}>
        <Button
          style={styles.callRingingButton}
          label="Answer"
          onPress={onAccept}
          type="success"
          icon="ios-call-outline"
        />
        <Button
          style={styles.callRingingButton}
          label="Reject"
          onPress={onReject}
          type="alert"
          icon="ios-close-outline"
        />
      </View>
    ];
  };

  return (
    <View style={[style, styles.callRingingContainer]}>{renderContents()}</View>
  );
};

CallRinging.propTypes = {
  call: SparkPropTypes.call.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onHangup: PropTypes.func.isRequired,
  style: View.propTypes.style
};

export default CallRinging;
