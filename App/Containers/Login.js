import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { authenticate } from '../Redux/Login';
import OAuth from '../Services/OAuth';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import Button from '../Components/Button';
import styles from './Styles/LoginStyles';

const mapStateToProps = state => state.login;
const mapDispatchToProps = { authenticate };

class Login extends Component {
  componentWillMount() {
    this.props.authenticate();
  }

  render() {
    const Contents = () => {
      if (this.props.loading) {
        return <Loading text="Loading..." />;
      }

      if (this.props.error) {
        return <Error text={this.props.error} />;
      }

      return (
        <Button
          label="Login to Spark"
          icon="ios-unlock-outline"
          onPress={() => OAuth.redirect()}
        />
      );
    };

    return (
      <View style={styles.container}>
        <Contents />
      </View>
    );
  }
}

Login.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
