import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { startPollingMessages, stopPollingMessages } from '../Redux/Messages';
import {
  registerPhone,
  requestPermissions,
  dialPhone,
  hangupPhone
} from '../Redux/Phone';
import VideoView from '../Components/VideoView';
import Dialer from '../Components/Dialer';
import Loading from '../Components/Loading';
import styles from './Styles/MainStyles';

class Main extends Component {
  async componentDidMount() {
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

  handleHangup = () => {
    this.props.hangupPhone();
  };

  render() {
    const { call } = this.props.phone;

    const messages = this.props.messages.data.filter(message => {
      if (!message.files || !message.files.length) {
        return false;
      }

      if (new Date(message.created) < call.connected) {
        return false;
      }

      return true;
    });

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

        {call.outgoing && <Loading text={`Calling ${call.address}...`} />}

        {call.connected || call.outgoing ? (
          <Button title="Hangup call" onPress={this.handleHangup} />
        ) : (
          <Dialer onCall={this.handleCall} />
        )}

        {messages.map(message =>
          message.files.map(file => (
            <Image style={{ flex: 1 }} source={file} key={file.uri} />
          ))
        )}
      </View>
    );
  }
}

Main.propTypes = {
  registerPhone: PropTypes.func.isRequired,
  requestPermissions: PropTypes.func.isRequired,
  dialPhone: PropTypes.func.isRequired,
  hangupPhone: PropTypes.func.isRequired,
  startPollingMessages: PropTypes.func.isRequired,
  stopPollingMessages: PropTypes.func.isRequired,

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
      connected: PropTypes.instanceOf(Date),
      outgoing: PropTypes.bool.isRequired
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
  startPollingMessages,
  stopPollingMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
