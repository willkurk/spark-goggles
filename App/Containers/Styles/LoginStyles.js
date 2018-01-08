import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  error: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red'
  }
});
