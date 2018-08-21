import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SparkPropTypes from '../PropTypes';
import { sendMessage } from '../Redux/Messages';
import { getPeople } from '../Redux/People';
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
  componentDidMount() {
    this.props.getPeople();
  }

  handleCall = address => {
    this.props.dialPhone({
      address,
      localView: 'localView',
      remoteView: 'remoteView',
      sharingView: 'sharingView'
    });
  };

  handleAcceptCall = () => {
    this.props.acceptIncomingCall({
      localView: 'localView',
      remoteView: 'remoteView',
      sharingView: 'sharingView'
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
    const { phone, messages, people } = this.props;
    const { call } = phone;
    const remoteViewStyle = call.connected
      ? styles.remoteViewVisible
      : styles.remoteViewHidden;

    return (
      <View style={styles.container}>
        <VideoView style={remoteViewStyle} nativeID="remoteView" />

	<VideoView style={styles.sharingVIewVisible} nativeID="sharingView" />

        <VideoView
          style={styles.localView}
          nativeID="localView"
          onSnapshot={this.handleReceiveSnapshot}
        />

        {!call.connected &&
          !call.ringing && (
            <Dialer
              style={styles.dialer}
              people={people}
              onCall={this.handleCall}
            />
          )}

        {call.ringing && (
          <CallRinging
            style={styles.callRinging}
            call={call}
            onAccept={this.handleAcceptCall}
            onReject={this.props.rejectIncomingCall}
            onHangup={this.props.hangupPhone}
          />
        )}

        {call.connected && (
          <CallConnected
            style={styles.callConnected}
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
  getPeople: PropTypes.func.isRequired,
  dialPhone: PropTypes.func.isRequired,
  hangupPhone: PropTypes.func.isRequired,
  acceptIncomingCall: PropTypes.func.isRequired,
  rejectIncomingCall: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  takeSnapshot: PropTypes.func.isRequired,
  messages: SparkPropTypes.messages.isRequired,
  phone: SparkPropTypes.phone.isRequired,
  people: SparkPropTypes.people.isRequired
};

const mapStateToProps = ({ phone, people, messages }) => ({
  phone,
  messages,
  people
});

const mapDispatchToProps = {
  getPeople,
  dialPhone,
  hangupPhone,
  acceptIncomingCall,
  rejectIncomingCall,
  sendMessage,
  takeSnapshot
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
