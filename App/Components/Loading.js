import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, Text } from 'react-native';
import styles, { spinnerColor } from './Styles/LoadingStyles';

const Loading = ({ text }) => (
  <View>
    <ActivityIndicator size="large" color={spinnerColor} />
    {text && <Text style={styles.loadingText}>{text}</Text>}
  </View>
);

Loading.propTypes = {
  text: PropTypes.string
};

export default Loading;
