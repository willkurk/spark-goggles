import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import { authenticate } from '../Redux/CurrentUser';
import OAuth from '../Services/OAuth';
import styles from './Styles/LoginStyles';

const mapDispatchToProps = {
  authenticate
};

class Login extends Component {
  async componentDidMount() {
    const auth = await OAuth.callback();

    if (auth.code) {
      this.props.authenticate({ code: auth.code });
    }

    if (auth.error) {
      console.error(auth.error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login" onPress={() => OAuth.redirect()} />
      </View>
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
