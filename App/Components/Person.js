import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import SparkPropTypes from '../PropTypes/';

const style = {
  padding: 15,
  borderBottomWidth: 1,
  borderColor: '#eee'
};

class Person extends Component {
  handlePress = () => {
    this.props.onCall(this.props.person.personEmail);
  };

  render() {
    const { person } = this.props;

    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={style}>
          <Text key={person.id} onPress={this.handlePress}>
            {person.personDisplayName} ({person.personEmail})
          </Text>
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
