import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const gridBase = 8;
const gap = (multiplier = 1) => gridBase * multiplier;

const Metrics = {
  gap,
  screenWidth: width,
  screenHeight: height
};

export default Metrics;
