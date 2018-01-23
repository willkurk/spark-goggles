import { StyleSheet } from 'react-native';
import { Metrics } from '../../Themes';

export default StyleSheet.create({
  callConnectedButtons: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: Metrics.gap(),
    flexDirection: 'row'
  },
  callConnectedButton: {
    marginLeft: Metrics.gap()
  }
});
