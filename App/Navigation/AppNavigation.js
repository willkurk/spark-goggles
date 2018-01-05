import { StackNavigator } from 'react-navigation';
import Login from '../Containers/Login';
import Main from '../Containers/Main';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    Login: { screen: Login },
    Main: { screen: Main }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default PrimaryNav;
