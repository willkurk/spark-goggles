import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, ViewPropTypes } from 'react-native';
import SparkPropTypes from '../PropTypes/';
import Loading from './Loading';
import Error from './Error';
import Person from './Person';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/DialerStyles';

const renderHeader = () => (
  <View style={styles.header}>
    <Icon style={styles.icon} name="ios-contacts-outline" size={30} />
    <Text style={styles.heading}>Contacts</Text>
  </View>
);

const Dialer = ({ people, onCall, style }) => {
  if (people.loading || !people.data) {
    return <Loading text="Loading people..." />;
  }

  if (people.error) {
    return <Error text={people.error} />;
  }

  return (
    <View style={style}>
      <FlatList
        data={people.data.map(person => ({ ...person, key: person.id }))}
        ListHeaderComponent={renderHeader}
        renderItem={({ item: person }) => (
          <Person key={person.id} person={person} onCall={onCall} />
        )}
      />
    </View>
  );
};

Dialer.propTypes = {
  onCall: PropTypes.func.isRequired,
  people: SparkPropTypes.people.isRequired,
  style: ViewPropTypes.style
};

export default Dialer;
