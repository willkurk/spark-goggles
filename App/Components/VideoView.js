import { requireNativeComponent, ViewPropTypes } from 'react-native';

const iface = {
  name: 'VideoView',
  propTypes: ViewPropTypes
};

export default requireNativeComponent('VideoView', iface)
