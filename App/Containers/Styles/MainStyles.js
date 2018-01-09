import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  localView: {
    display: 'none'
  },

  remoteView: {
    flex: 1
  }
});
