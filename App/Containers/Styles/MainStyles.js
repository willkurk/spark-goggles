import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  // By setting the size to 1x1, you won't really see the local view, but
  // it will still be there. Display none will not work here, because it
  // will actually remove the video view.
  localView: {
    width: 1,
    height: 1
  },

  remoteView: {
    flex: 1
  }
});
