import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, ViewPropTypes } from 'react-native';
import SparkPropTypes from '../PropTypes/';
import Loading from './Loading';
import Error from './Error';
import Room from './Room';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/DialerStyles';

const renderHeader = () => (
  <View style={styles.header}>
    <Icon style={styles.icon} name="ios-contacts-outline" size={30} />
    <Text style={styles.heading}>Contacts</Text>
  </View>
);

const DialerRooms = ({ rooms, onCall, style }) => {
  if (rooms.loading || !rooms.data) {
    return <Loading text="Loading rooms..." />;
  }

  if (rooms.error) {

    return <Error text={rooms.error} />;
  }

  return (
    <View style={style}>
      <FlatList
        data={rooms.data.map(room => ({ ...room, key: room.id }))}
        ListHeaderComponent={renderHeader}
        renderItem={({ item: room }) => (
          <Person key={room.id} room={room} onCall={onCall} />
        )}
      />
    </View>
  );
};

DialerRooms.propTypes = {
  onCall: PropTypes.func.isRequired,
  rooms: SparkPropTypes.rooms.isRequired,
  style: ViewPropTypes.style
};

export default DialerRooms;
