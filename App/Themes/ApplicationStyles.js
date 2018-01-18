import { Dimensions } from 'react-native';
import Colors from './Colors';
const { width, height } = Dimensions.get('window');

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    container: {
      position: 'absolute',
      left: 0,
      //right: 0,
      top: 0,
      //bottom: 0,
      width: width,
      height: height,
      backgroundColor: "#000",
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
};

export default ApplicationStyles;
