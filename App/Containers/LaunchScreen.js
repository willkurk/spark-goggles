import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, Text, Button, View } from 'react-native';
import { connect } from 'react-redux';
import {
  registerPhone,
  requestPermissions,
  dialPhone,
  hangupPhone
} from '../Redux/Phone';
import VideoView from '../Components/VideoView';
import styles from './Styles/LaunchScreenStyles';

class LaunchScreen extends Component {
  handlePermissions = () => {
    this.props.requestPermissions();
  };

  handleCall = () => {
    this.props.dialPhone({
      address: 'ray@promptworks.com',
      localView: 'localView',
      remoteView: 'remoteView'
    });
  };

  handleHangup = () => {
    this.props.hangupPhone();
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={{ color: 'black' }}>
              {JSON.stringify(this.props.phone)}
            </Text>

            <Button title="Register" onPress={this.props.registerPhone} />

            {this.props.phone.registration.complete && (
              <Button
                title="Request permissions"
                onPress={this.handlePermissions}
              />
            )}

            {this.props.phone.permissionsGranted && (
              <Button title="Make a call" onPress={this.handleCall} />
            )}

            {this.props.phone.call.connected && (
              <Button title="Hangup call" onPress={this.handleHangup} />
            )}

            {this.props.phone.call.outgoing && (
              <Text style={{ color: 'black' }}>Dialing...</Text>
            )}

            <VideoView
              style={{ width: 100, height: 100 }}
              nativeID="localView"
            />
            <VideoView
              style={{ width: 100, height: 100 }}
              nativeID="remoteView"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

LaunchScreen.propTypes = {
  authenticate: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
