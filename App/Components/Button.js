import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, ViewPropTypes } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles/ButtonStyles';

const Button = ({ onPress, label, icon, style, type = 'default' }) => {
  const buttonTypeStyle = styles[`${type}Type`];
  const buttonShapeStyle = !!icon && !label ? styles.iconShape : {};

  return (
    <TouchableOpacity
      style={[styles.button, buttonTypeStyle, buttonShapeStyle, style]}
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
  type: PropTypes.oneOf(['default', 'success', 'alert']),
  style: ViewPropTypes.style
};

export default Button;
