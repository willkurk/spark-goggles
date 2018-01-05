import { StackNavigator } from 'react-navigation';
import LoginScreen from '../Containers/LoginScreen';
import MainScreen from '../Containers/MainScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    MainScreen: { screen: MainScreen }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default PrimaryNav;
