import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import SparkPropTypes from '../PropTypes/';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/PersonStyles';

class Person extends Component {
  handlePress = () => {
    this.props.onCall(this.props.person.personEmail);
  };

  render() {
    const { person } = this.props;

    return (
      <TouchableOpacity key={person.id} onPress={this.handlePress}>
        <View style={styles.item}>
          <Icon style={styles.icon} name="ios-call-outline" size={24} />

          <Text style={styles.name}>{person.personDisplayName}</Text>

          <Text style={styles.email}>{person.personEmail}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Person.propTypes = {
  person: SparkPropTypes.person.isRequired,
  onCall: PropTypes.func.isRequired
};

export default Person;
