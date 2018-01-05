import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Button } from 'react-native';
import { authenticate } from '../Redux/CurrentUser';
import OAuth from '../Services/OAuth';

const mapStateToProps = ({ currentUser }) => ({
  currentUser
});

const mapDispatchToProps = {
  authenticate
};

class Login extends Component {
  async componentDidMount() {
    const code = await OAuth.callback();

    if (code) {
      this.props.authenticate({ code });
    }
  }

  /**
   * After the user gets signed in, redirect.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser.data) {
      this.props.navigation.navigate('Main');
    }
  }

  handleLogin = () => {
    OAuth.redirect();
  };

  render() {
    console.log('currentUser:', this.props.currentUser); // eslint-disable-line

    return (
      <View>
        <ScrollView>
          <Button title="Login" onPress={this.handleLogin} />
        </ScrollView>
      </View>
    );
  }
}

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,

  currentUser: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      accessToken: PropTypes.string
    })
  }).isRequired,

  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
