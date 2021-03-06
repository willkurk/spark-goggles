import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerPhone } from '../Redux/Phone';
import SparkPropTypes from '../PropTypes/';
import Loading from '../Components/Loading';
import { ApplicationStyles } from '../Themes';

const mapStateToProps = ({ phone }) => ({ phone });
const mapDispatchToProps = { registerPhone };

class DeviceRegistration extends Component {
  componentDidMount() {
    this.props.registerPhone();
  }

  render() {
    const { error } = this.props.phone.registration;

    const Content = () => {
      if (error) {
        return <Text style={{ flex: 1, color: 'red' }}>{error}</Text>;
      }

      return <Loading text="Registering your device..." />;
    };

    return (
      <View style={{ ...ApplicationStyles.screen.container }}>
        <Content />
      </View>
    );
  }
}

DeviceRegistration.propTypes = {
  registerPhone: PropTypes.func.isRequired,
  phone: SparkPropTypes.phone.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceRegistration);
