import { StyleSheet } from 'react-native';
import { Metrics } from '../../Themes';

export default StyleSheet.create({
  imageViewerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    elevation: 2
  },
  imageViewerImage: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  imageReducedSizeStyle: {
    width: 160,
    height: Metrics.screenHeight
  },
  imageFullSizeStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  imageViewerButtons: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Metrics.screenWidth,
    margin: Metrics.gap(),
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.5
  },
  imageViewerButton: {
    marginRight: Metrics.gap()
  }
});
