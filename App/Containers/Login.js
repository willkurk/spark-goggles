import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { WebView } from 'react-native';
import { authenticate } from '../Redux/CurrentUser';
import OAuth from '../Services/OAuth';
import styles from './Styles/LoginStyles';

const mapDispatchToProps = {
  authenticate
};

const generateId = () =>
  Math.random()
    .toString(36)
    .substring(7);

class Login extends Component {
  stateParameter = generateId();

  handleLoadStart = ({ nativeEvent }) => {
    const auth = OAuth.checkAuthorization({
      url: nativeEvent.url,
      state: this.stateParameter
    });

    if (auth.code) {
      this.props.authenticate({ code: auth.code });
    }

    if (auth.error) {
      console.error(auth.error);
    }
  };

  render() {
    return (
      <WebView
        style={styles.container}
        source={{ uri: OAuth.generateRedirectURL(this.stateParameter) }}
        onLoadStart={this.handleLoadStart}
        domStorageEnabled
        javaScriptEnabled
        thirdPartyCookiesEnabled
      />
    );
  }
}

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,

  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, mapDispatchToProps)(Login);
