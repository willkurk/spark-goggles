import React from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import SparkPropTypes from '../PropTypes/';
import Loading from '../Components/Loading';

const CallRinging = ({ call, onAccept, onReject, onHangup }) => {
  if (!call.person.isInitiator) {
    return (
      <View style={{ flex: 1 }}>
        <Loading text={`Calling ${call.person.email}`} />
        <Button title="Hangup" onPress={onHangup} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Loading text={`${call.person.email} is calling...`} />
      <Button title="Answer" onPress={onAccept} />
      <Button title="Reject" onPress={onReject} />
    </View>
  );
};

CallRinging.propTypes = {
  call: SparkPropTypes.call.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onHangup: PropTypes.func.isRequired
};

export default CallRinging;
