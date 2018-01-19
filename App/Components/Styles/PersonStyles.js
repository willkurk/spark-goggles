import { StyleSheet } from 'react-native';
import { Colors, Metrics, Type } from '../../Themes';

export default StyleSheet.create({
  item: {
    backgroundColor: Colors.teal,
    padding: Metrics.gap(2),
    margin: Metrics.gap(),
    marginBottom: 0,
    borderRadius: Metrics.gap(4),
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    ...Type.default,
    color: Colors.white
  },
  email: {
    ...Type.small,
    color: Colors.white,
    marginLeft: 'auto',
    paddingHorizontal: Metrics.gap()
  },
  icon: {
    color: Colors.white,
    paddingLeft: Metrics.gap(),
    paddingRight: Metrics.gap(2)
  }
});
