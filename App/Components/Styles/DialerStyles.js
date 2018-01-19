import { StyleSheet } from 'react-native';
import { Colors, Type, Metrics } from '../../Themes';

export default StyleSheet.create({
  header: {
    paddingTop: Metrics.gap(),
    paddingHorizontal: Metrics.gap(2),
    backgroundColor: Colors.clear,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    color: Colors.white,
    paddingRight: Metrics.gap()
  },
  heading: {
    ...Type.large,
    color: Colors.white
  }
});
