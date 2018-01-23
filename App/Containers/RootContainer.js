import React, { Component } from 'react';
import { View } from 'react-native';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import { Immersive } from 'react-native-immersive';

// Styles
import styles from './Styles/RootContainerStyles';

class RootContainer extends Component {
  constructor(props) {
    super(props);

    const setImmersive = () => Immersive.setImmersive(true);

    Immersive.setImmersive(true);
    Immersive.addImmersiveListener(setImmersive);
    Immersive.removeImmersiveListener(setImmersive);
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <ReduxNavigation />
      </View>
    );
  }
}

export default RootContainer;
