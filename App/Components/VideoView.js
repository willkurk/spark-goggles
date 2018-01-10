import { requireNativeComponent, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const iface = {
  name: 'VideoView',
  propTypes: {
    ...ViewPropTypes,
    snapshot: PropTypes.bool
  }
};

export default requireNativeComponent('VideoView', iface);
