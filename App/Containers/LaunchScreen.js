import React, { Component } from 'react';
import { ScrollView, Text, Button, View } from 'react-native';
import { connect } from 'react-redux';
import { Images } from '../Themes';
import * as CurrentUser from '../Redux/CurrentUser';

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Button
              title="Come on..."
              onPress={() => this.props.generateToken('Rick', 'ricky')}
            />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText}>
              {JSON.stringify(this.props.currentUser)}
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
