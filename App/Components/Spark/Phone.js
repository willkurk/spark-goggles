import { requireNativeComponent, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const iface = {
  name: 'Phone',
  propTypes: ViewPropTypes
};

export default requireNativeComponent('Phone', iface)
