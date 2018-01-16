import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import SparkPropTypes from '../PropTypes/';
import Loading from './Loading';
import Error from './Error';
import Person from './Person';

const Dialer = ({ people, onCall }) => {
  if (people.loading || !people.data) {
    return <Loading text="Loading people..." />;
  }

  if (people.error) {
    return <Error text={people.error} />;
  }

  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          padding: 15,
          backgroundColor: 'blue',
          color: 'white'
        }}
      >
        Who do you want to call?
      </Text>

      <FlatList
        data={people.data.map(person => ({ ...person, key: person.id }))}
        renderItem={({ item: person }) => (
          <Person key={person.id} person={person} onCall={onCall} />
        )}
      />
    </View>
  );
};

Dialer.propTypes = {
  onCall: PropTypes.func.isRequired,
  people: SparkPropTypes.people.isRequired
};

export default Dialer;
