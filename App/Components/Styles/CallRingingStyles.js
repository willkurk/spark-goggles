import { StyleSheet } from 'react-native';
import { Metrics } from '../../Themes';

export default StyleSheet.create({
  callRingingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    top: 0,
    left: 0,
    flex: 1
  },
  callRingingButtons: {
    padding: Metrics.gap()
  }
});
