import { StyleSheet } from 'react-native';
import { Colors, Type, Metrics } from '../../Themes';

export default StyleSheet.create({
  button: {
    padding: Metrics.gap(2),
    borderRadius: Metrics.gap(4),
    flexDirection: 'row'
  },
  defaultType: {
    backgroundColor: Colors.teal
  },
  successType: {
    backgroundColor: Colors.green
  },
  alertType: {
    backgroundColor: Colors.red
  },
  label: {
    ...Type.default,
    color: Colors.white,
    paddingHorizontal: Metrics.gap()
  },
  icon: {
    color: Colors.white,
    paddingHorizontal: Metrics.gap(0.5)
  }
});
