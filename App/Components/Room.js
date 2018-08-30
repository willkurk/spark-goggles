import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import SparkPropTypes from '../PropTypes/';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/PersonStyles';

class Room extends Component {
  handlePress = () => {
    this.props.onCall(this.props.room.roomId);
  };

  render() {
    const { room } = this.props;

    return (
      <TouchableOpacity key={room.id} onPress={this.handlePress}>
        <View style={styles.item}>
          <Icon style={styles.icon} name="ios-call-outline" size={24} />

          <Text style={styles.name}>{room.id}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Room.propTypes = {
  room: SparkPropTypes.room.isRequired,
  onCall: PropTypes.func.isRequired
};

export default Room;
