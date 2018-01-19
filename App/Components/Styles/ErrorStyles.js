import { StyleSheet } from 'react-native';
import { Colors, Type, Metrics } from '../../Themes';

export default StyleSheet.create({
  errorContainer: {
    alignItems: 'center'
  },
  errorIcon: {
    color: Colors.red
  },
  errorLabel: {
    ...Type.default,
    color: Colors.red,
    paddingTop: Metrics.gap(2)
  }
});
