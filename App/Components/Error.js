import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const Error = ({ text }) => <Text style={{ color: 'red' }}>{text}</Text>;

Error.propTypes = {
  text: PropTypes.string.isRequired
};

export default Error;
