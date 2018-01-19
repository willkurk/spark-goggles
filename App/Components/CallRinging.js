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
          <Button label="Hangup" onPress={onHangup} />
        </View>
      ];
    }

    return [
      <Loading key="loading" text={`${call.person.email} is calling...`} />,
      <View key="buttons" style={styles.callRingingButtons}>
        <Button label="Answer" onPress={onAccept} color="green" />
        <Button label="Reject" onPress={onReject} color="red" />
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
