import { StyleSheet } from 'react-native';
import { Colors, ApplicationStyles } from '../../Themes';

export const spinnerColor = Colors.green;

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
