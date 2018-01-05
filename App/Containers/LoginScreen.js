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

class LoginScreen extends Component {
  async componentDidMount() {
    const code = await OAuth.callback();

    if (code) {
      this.props.authenticate({ code });
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

LoginScreen.propTypes = {
  authenticate: PropTypes.func.isRequired,

  currentUser: PropTypes.shape({
    name: PropTypes.string,
    sub: PropTypes.string,
    accessToken: PropTypes.string
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
