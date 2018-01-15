import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, View } from 'react-native';
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
import Loading from '../Components/Loading';
import ImageViewer from '../Components/ImageViewer';
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

        <ImageViewer call={call} messages={messages} />

        {call.ringing &&
          call.person.isInitiator && (
            <View style={{ flex: 1 }}>
              <Loading text={`${call.person.email} is calling...`} />
              <Button
                title="Answer"
                onPress={this.handleAcceptCall}
                style={{ marginBottom: 10 }}
              />
              <Button title="Reject" onPress={this.props.rejectIncomingCall} />
            </View>
          )}

        {call.ringing &&
          !call.person.isInitiator && (
            <Loading text={`Calling ${call.person.email}...`} />
          )}

        {call.connected && (
          <Button
            title="Send Snapshot"
            style={{ marginTop: 10, marginBottom: 10 }}
            onPress={this.handleTriggerSnapshot}
          />
        )}

        {(call.connected || (call.ringing && !call.person.isInitiator)) && (
          <Button title="Hangup call" onPress={this.props.hangupPhone} />
        )}

        {!call.connected &&
          !call.ringing && <Dialer onCall={this.handleCall} />}
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
