import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/ButtonStyles';

const Button = ({ onPress, label, icon, type = 'default' }) => {
  const buttonTypeStyle = styles[`${type}Type`];

  return (
    <TouchableOpacity
      style={[styles.button, buttonTypeStyle]}
      onPress={onPress}
    >
      {!!icon && <Icon style={styles.icon} name={icon} size={24} />}
      {!!label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.oneOf(['default', 'success', 'alert'])
};

export default Button;
