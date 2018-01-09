import PropTypes from 'prop-types';
import React, { Component } from 'react';
<<<<<<< HEAD
import { Text, Button, View, Image } from 'react-native';
import Camera from 'react-native-camera';
=======
import { Button, View, Image } from 'react-native';
>>>>>>> Extract camera component. This is basically broken, yo
import { connect } from 'react-redux';
import { sendMessage } from '../Redux/Messages';
import {
  registerPhone,
  requestPermissions,
  dialPhone,
  hangupPhone,
  acceptIncomingCall,
  rejectIncomingCall
} from '../Redux/Phone';
import VideoView from '../Components/VideoView';
import Dialer from '../Components/Dialer';
import Loading from '../Components/Loading';
import Camera from '../Components/Camera';
import styles from './Styles/MainStyles';

class Main extends Component {
  state = {
    isTakingSnapshot: false
  };

  componentDidMount() {
    this.props.registerPhone();
    this.props.requestPermissions();
  }

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

  handleSendImage = picture => {
    this.props.sendMessage({
      text: 'Here is what I see...',
      toPersonEmail: this.props.phone.call.address,
      files: [picture.path]
    });
  };

  render() {
    const { call, registration } = this.props.phone;

    const messages = this.props.messages.data.filter(message => {
      if (!message.files || !message.files.length) {
        return false;
      }

      if (new Date(message.created) < call.connected) {
        return false;
      }

      return true;
    });

    if (registration.error) {
      return (
        <Text style={{ flex: 1, color: 'red' }}>
          Failed to register: {JSON.stringify(registration.error)}
        </Text>
      );
    }

    if (!registration.complete) {
      return <Loading text="Registering your device..." />;
    }

    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            display: call.connected ? 'flex' : 'none'
          }}
        >
          <VideoView style={styles.localView} nativeID="localView" />
          <VideoView style={styles.remoteView} nativeID="remoteView" />
        </View>

        {messages.map(message =>
          message.files.map(file => (
            <Image style={{ flex: 1 }} source={file} key={file.uri} />
          ))
        )}

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
  registerPhone: PropTypes.func.isRequired,
  requestPermissions: PropTypes.func.isRequired,

  dialPhone: PropTypes.func.isRequired,
  hangupPhone: PropTypes.func.isRequired,

  acceptIncomingCall: PropTypes.func.isRequired,
  rejectIncomingCall: PropTypes.func.isRequired,

  sendMessage: PropTypes.func.isRequired,

  messages: PropTypes.shape({
    roomId: PropTypes.string,
    data: PropTypes.array
  }),

  phone: PropTypes.shape({
    permissionsGranted: PropTypes.bool.isRequired,

    registration: PropTypes.shape({
      complete: PropTypes.bool.isRequired,
      loading: PropTypes.bool.isRequired
    }).isRequired,

    call: PropTypes.shape({
      ringing: PropTypes.bool.isRequired,
      connected: PropTypes.instanceOf(Date),
      person: PropTypes.shape({
        email: PropTypes.string.isRequired,
        isInitiator: PropTypes.bool.isRequired
      })
    }).isRequired
  }).isRequired
};

const mapStateToProps = ({ phone, messages }) => ({
  phone,
  messages
});

const mapDispatchToProps = {
  registerPhone,
  requestPermissions,
  dialPhone,
  hangupPhone,
  acceptIncomingCall,
  rejectIncomingCall,
  sendMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
