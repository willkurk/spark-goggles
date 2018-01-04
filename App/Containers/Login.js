import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import { authenticate } from '../Redux/CurrentUser';
import OAuth from '../Services/OAuth';
import Loading from '../Components/Loading';
import styles from './Styles/LoginStyles';

const mapStateToProps = state => state.currentUser;
const mapDispatchToProps = { authenticate };

class Login extends Component {
  componentDidMount() {
    this.props.authenticate();
  }

  render() {
    if (!this.props.loading) {
      return <Loading text="Loading..." />;
    }

    if (this.props.error) {
      return <Text style={styles.error}>{this.props.error}</Text>;
    }

    return (
      <View style={styles.container}>
        <Button title="Login" onPress={() => OAuth.redirect()} />
      </View>
    );
  }
}

Login.propTypes = {
  error: PropTypes.object, // eslint-disable-line
  loading: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
