import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/ErrorStyles';

const Error = ({ text }) => (
  <View style={styles.errorContainer}>
    <Icon style={styles.errorIcon} size={24} name="ios-warning-outline" />
    <Text style={styles.errorLabel}>{text}</Text>
  </View>
);

Error.propTypes = {
  text: PropTypes.string.isRequired
};

export default Error;
