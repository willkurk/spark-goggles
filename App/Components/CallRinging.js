import React from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import SparkPropTypes from '../PropTypes/';
import Loading from '../Components/Loading';

const CallRinging = ({ call, onAccept, onReject, onHangup, style }) => {
  if (!call.person.isInitiator) {
    return (
      <View style={[style, { flex: 1 }]}>
        <Loading text={`Calling ${call.person.email}`} />
        <Button title="Hangup" onPress={onHangup} />
      </View>
    );
  }

  return (
    <View style={[style, { flex: 1, justifyContent: 'flex-end' }]}>
      <View style={{ flex: 1 }}>
        <Loading text={`${call.person.email} is calling...`} />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 0.5 }}>
          <Button title="Answer" onPress={onAccept} color="green" />
        </View>
        <View style={{ flex: 0.5 }}>
          <Button title="Reject" onPress={onReject} color="red" />
        </View>
      </View>
    </View>
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
