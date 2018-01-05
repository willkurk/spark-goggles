import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Button } from 'react-native';

class Dialer extends Component {
  state = {
    address: 'thomas@promptworks.com'
  };

  handleChange = address => {
    this.stateState({ address });
  };

  handleCall = () => {
    this.props.onCall(this.state.address);
  };

  render() {
    return (
      <View stlye={{ flex: 1, ...this.props.style }}>
        <TextInput
          onChangeText={this.handleChange}
          value={this.state.address}
        />

        <Button
          title={`Call ${this.state.address}`}
          onPress={this.handleCall}
        />
      </View>
    );
  }
}

Dialer.propTypes = {
  onCall: PropTypes.func.isRequired,
  style: PropTypes.object // eslint-disable-line
};

export default Dialer;
