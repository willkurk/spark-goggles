import './App/Config/ReactotronConfig';
import { AppRegistry } from 'react-native';
import App from './App/Containers/App';

/**
 * CiscoSpark relies on `nextTick`, which apparently
 * isn't available in React Native.
 */
process.nextTick = setImmediate;

AppRegistry.registerComponent('SparkGoggles', () => App);
