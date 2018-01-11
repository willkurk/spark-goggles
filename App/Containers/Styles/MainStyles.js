import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  localView: {
    // width: 10,
    // height: 10
    flex: 1
  },

  remoteView: {
    flex: 1
  }
});
