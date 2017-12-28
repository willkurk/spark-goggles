import React, { Component } from 'react';
import { ScrollView, Text, Button, View } from 'react-native';
import { connect } from 'react-redux';
import { Images } from '../Themes';
import * as CurrentUser from '../Redux/CurrentUser';
import Phone from '../Components/Spark/Phone';

import { NativeModules } from 'react-native';

// Styles
import styles from './Styles/LaunchScreenStyles'

const PhoneImpl = NativeModules.PhoneImpl;

console.log(PhoneImpl);

class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Button
              title="Get a guess access token"
              onPress={() => this.props.generateToken('Rick', 'ricky')}
            />

            <Button
              title="Toast"
              onPress={() => PhoneImpl.toast('Hello', 2000)}
            />
          </View>

          <View style={styles.section}>
            <Phone style={{ width: 100, height: 100 }} />

            <Text style={styles.sectionText} style={{color: 'black'}}>
              Current user: {JSON.stringify(this.props.currentUser)}
            </Text>
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
