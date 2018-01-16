import { Dimensions, StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  // By setting the size to 1x1, you won't really see the local view, but
  // it will still be there. Display none will not work here, because it
  // will actually remove the video view.

  callViewHidden: {
    display: 'none'
  },
  callViewVisible: {
    width: width,
    height: height
  },
  localView: {
    position: 'absolute',
    width: width,
    height: height,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },

  remoteView: {
    width: 50,
    height: 50,
    top: 0,
    right: 0
  },

  callRinging: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: width
  },

  callConnected: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: width
  }
});
