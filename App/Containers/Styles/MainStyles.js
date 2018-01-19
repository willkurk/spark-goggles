import { Dimensions, StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  localView: {
    position: 'absolute',
    width: width,
    height: height,
    left: 0,
    top: 0,
    elevation: 1
  },

  remoteView: {
    position: 'absolute',
    width: 160,
    height: 90,
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255,0,0,0.2)',
    elevation: 2
  },

  dialer: {
    position: 'absolute',
    width: width,
    height: height,
    right: 0,
    top: 0,
    elevation: 3
  },

  callRinging: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: width,
    elevation: 4
  },

  callConnected: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: width,
    elevation: 3
  }
});
