import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { connect } from 'react-redux';
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
      </View>
    );
  }
}

Main.propTypes = {
  registerPhone: PropTypes.func.isRequired,
  requestPermissions: PropTypes.func.isRequired,
  dialPhone: PropTypes.func.isRequired,
  hangupPhone: PropTypes.func.isRequired,

  phone: PropTypes.shape({
    permissionsGranted: PropTypes.bool.isRequired,

    registration: PropTypes.shape({
      complete: PropTypes.bool.isRequired,
      loading: PropTypes.bool.isRequired
    }).isRequired,

    call: PropTypes.shape({
      connected: PropTypes.bool.isRequired,
      outgoing: PropTypes.bool.isRequired
    }).isRequired
  }).isRequired
};

const mapStateToProps = ({ phone }) => ({
  phone
});

const mapDispatchToProps = {
  registerPhone,
  requestPermissions,
  dialPhone,
  hangupPhone
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
