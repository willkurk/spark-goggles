import { StyleSheet } from 'react-native';
import { Colors, Metrics, Type } from '../../Themes';

export const spinnerColor = Colors.teal;

export default StyleSheet.create({
  loadingText: {
    ...Type.default,
    color: Colors.darkGrey,
    paddingTop: Metrics.gap(2)
  }
});
