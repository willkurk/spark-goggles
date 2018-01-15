import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SparkPropTypes from '../PropTypes';
import { sendMessage } from '../Redux/Messages';
import {
  dialPhone,
  hangupPhone,
  acceptIncomingCall,
  rejectIncomingCall,
  takeSnapshot
} from '../Redux/Phone';
import VideoView from '../Components/VideoView';
import Dialer from '../Components/Dialer';
import CallRinging from '../Components/CallRinging';
import CallConnected from '../Components/CallConnected';
import styles from './Styles/MainStyles';

class Main extends Component {
  handleCall = address => {
    this.props.dialPhone({
      address,
      localView: 'localView',
      remoteView: 'remoteView'
    });
  };

  handleAcceptCall = () => {
    this.props.acceptIncomingCall({
      localView: 'localView',
      remoteView: 'remoteView'
    });
  };

  handleTriggerSnapshot = () => {
    this.props.takeSnapshot('localView');
  };

  handleReceiveSnapshot = snapshot => {
    if (snapshot.error) {
      throw new Error(snapshot.error);
    }

    this.props.sendMessage({
      text: 'Do you see what I see?',
      toPersonEmail: this.props.phone.call.person.email,
      files: [snapshot.path]
    });
  };

  render() {
    const { phone, messages } = this.props;
    const { call } = phone;

    return (
      <View style={styles.container}>
        <View style={{ flex: 1, display: call.connected ? 'flex' : 'none' }}>
          <VideoView
            style={styles.localView}
            nativeID="localView"
            onSnapshot={this.handleReceiveSnapshot}
          />
          <VideoView style={styles.remoteView} nativeID="remoteView" />
        </View>

        {!call.connected &&
          !call.ringing && <Dialer onCall={this.handleCall} />}

        {call.ringing && (
          <CallRinging
            call={call}
            onAccept={this.handleAcceptCall}
            onReject={this.props.rejectIncomingCall}
            onHangup={this.props.hangupPhone}
          />
        )}

        {call.connected && (
          <CallConnected
            call={call}
            messages={messages}
            onHangup={this.props.hangupPhone}
            onTriggerSnapshot={this.handleTriggerSnapshot}
          />
        )}
      </View>
    );
  }
}

Main.propTypes = {
  dialPhone: PropTypes.func.isRequired,
  hangupPhone: PropTypes.func.isRequired,
  acceptIncomingCall: PropTypes.func.isRequired,
  rejectIncomingCall: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  takeSnapshot: PropTypes.func.isRequired,
  messages: SparkPropTypes.messages.isRequired,
  phone: SparkPropTypes.phone.isRequired
};

const mapStateToProps = ({ phone, messages }) => ({
  phone,
  messages
});

const mapDispatchToProps = {
  dialPhone,
  hangupPhone,
  acceptIncomingCall,
  rejectIncomingCall,
  sendMessage,
  takeSnapshot
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
