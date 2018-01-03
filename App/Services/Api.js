import axios from 'axios';
import {
  NativeModules,
  PermissionsAndroid,
  DeviceEventEmitter
} from 'react-native';

const { Phone } = NativeModules;

const PHONE_EVENTS = [
  'phone:ringing',
  'phone:connected',
  'phone:disconnected',
  'phone:media-changed'
];

const create = () => {
  const api = axios.create({
    baseURL: 'https://7s6pizsaij.execute-api.us-west-2.amazonaws.com/dev/jwt'
  });

  const generateGuestToken = async (name, sub) => {
    const response = await api.post('/', { name, sub });
    return response.data.token;
  };

  const requestPermission = async name => {
    const granted = await PermissionsAndroid.request(name);

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      throw new Error('Failed to grant permission.');
    }
  };

  const dialPhone = async ({ address, localView, remoteView }) => {
    return Phone.dial(address, localView, remoteView);
  };

  const observePhone = callback => {
    PHONE_EVENTS.forEach(eventName => {
      DeviceEventEmitter.addListener(eventName, _event => {
        callback({ type: eventName });
      });
    });
  };

  return {
    generateGuestToken,
    requestPermission,
    dialPhone,
    observePhone,
    exchangeGuestToken: Phone.authenticate,
    registerPhone: Phone.register,
    hangupPhone: Phone.hangup
  };
};

export default {
  create
};
