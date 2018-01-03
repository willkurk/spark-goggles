import React, { Component } from 'react';
import {
  NativeModules,
  ScrollView,
  Text,
  Button,
  View,
  PermissionsAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { authenticate } from '../Redux/CurrentUser';
import { registerPhone, requestPermissions } from '../Redux/Phone';
import VideoView from '../Components/VideoView';
import styles from './Styles/LaunchScreenStyles';

const { Phone } = NativeModules;

class LaunchScreen extends Component {
  state = {
    activeCall: false,
    permissions: false
  };

  handleAuthenticate = () => {
    this.props.authenticate({
      name: 'Rick',
      sub: 'ricky'
    });
  };

  handleRegister = () => {
    this.props.registerPhone();
  };

  handlePermissions = () => {
    this.props.requestPermissions();
  };

  handleCall = () => {
    Phone.dial('ray@promptworks.com', 'localView', 'remoteView')
      .then(() => this.setState({ activeCall: true }))
      .catch(error => console.error(error));
  };

  handleHangup = () => {
    Phone.hangup()
      .then(() => this.setState({ activeCall: false, permissions: false }))
      .catch(error => console.error(error));
  };

  render() {
    const { currentUser } = this.props;
    const accessToken = currentUser.data && currentUser.data.accessToken;

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={{ color: 'black' }}>
              {JSON.stringify({
                ...this.state,
                registered: this.props.phone.registration.complete,
                accessToken: !!accessToken
              })}
            </Text>

            <Button title="Authenticate" onPress={this.handleAuthenticate} />

            {accessToken && (
              <Button title="Register" onPress={this.handleRegister} />
            )}

            {this.props.phone.registration.complete && (
              <Button
                title="Request permissions"
                onPress={this.handlePermissions}
              />
            )}

            {this.props.phone.permissionsGranted && (
              <Button title="Make a call" onPress={this.handleCall} />
            )}

            {this.state.activeCall && (
              <Button title="Hangup call" onPress={this.handleHangup} />
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

  phone: PropTypes.shape({
    registration: PropTypes.shape({
      complete: PropTypes.bool.isRequired,
      loading: PropTypes.bool.isRequired
    }).isRequired
  }).isRequired,

  currentUser: PropTypes.shape({
    name: PropTypes.string,
    sub: PropTypes.string,
    accessToken: PropTypes.string
  })
};

const mapStateToProps = ({ currentUser, phone }) => ({
  currentUser,
  phone
});

const mapDispatchToProps = {
  authenticate,
  registerPhone,
  requestPermissions
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
