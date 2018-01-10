import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  localView: {
    // flex: 1
    width: 1,
    height: 1
  },

  remoteView: {
    flex: 1
  }
});
