import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  localView: {
    flex: 1
  },

  remoteView: {
    flex: 1
  }
});
