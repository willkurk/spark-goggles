import React, { Component } from 'react';
import { NativeModules, ScrollView, Text, Button, View, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import * as CurrentUser from '../Redux/CurrentUser';
import VideoView from '../Components/VideoView';
import styles from './Styles/LaunchScreenStyles'

const { Phone } = NativeModules;

const requestPermission = async (name) => {
  try {
    const granted = await PermissionsAndroid.request(name);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

class LaunchScreen extends Component {
  state = {
    registered: false,
    accessToken: null,
    activeCall: false,
    permissions: false
  };

  handleGenerateToken = () => {
    this.props.generateToken('Rick', 'ricky');
  }

  handleAuthenticate = () => {
    Phone.authenticate(this.props.currentUser.data.token)
      .then(accessToken => this.setState({ accessToken }))
      .catch((error) => console.error(error));
  }

  handleRegister = () => {
    Phone.register()
      .then(() => this.setState({ registered: true }))
      .catch((error) => console.error(error));
  }

  handlePermissions = () => {
    requestPermission(PermissionsAndroid.PERMISSIONS.CAMERA)
      .then(() => requestPermission(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO))
      .then(() => this.setState({ permissions: true }))
      .catch((error) => console.error(error));
  }

  handleCall = () => {
    Phone.dial('ray@promptworks.com', 'localView', 'remoteView')
      .then(() => this.setState({ activeCall: true }))
      .catch((error) => console.error(error));
  }

  handleHangup = () => {
    Phone.hangup()
      .then(() => this.setState({ activeCall: false, permissions: false }))
      .catch((error) => console.error(error));
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text style={{color: 'black'}}>
              {JSON.stringify({
                ...this.state,
                jwt: !!this.props.currentUser.data,
                accessToken: !!this.state.accessToken
              })}
            </Text>

            <Button
              title="Get a guess access token"
              onPress={this.handleGenerateToken}
            />

            {this.props.currentUser.data && (
              <Button
                title="Authenticate"
                onPress={this.handleAuthenticate}
              />
            )}

            {this.state.accessToken && (
              <Button
                title="Register"
                onPress={this.handleRegister}
              />
            )}

            {this.state.registered && (
              <Button
                title="Request permissions"
                onPress={this.handlePermissions}
              />
            )}

            {this.state.permissions && (
              <Button
                title="Make a call"
                onPress={this.handleCall}
              />
            )}

            {this.state.activeCall && (
              <Button
                title="Hangup call"
                onPress={this.handleHangup}
              />
            )}

            <VideoView style={{width: 100, height: 100}} nativeID="localView" />
            <VideoView style={{width: 100, height: 100}} nativeID="remoteView" />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser
});

const mapDispatchToProps = {
  generateToken: CurrentUser.generateToken
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
