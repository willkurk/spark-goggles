import axios from 'axios';
import { NativeModules, PermissionsAndroid } from 'react-native';

const { Phone } = NativeModules;

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

  return {
    generateGuestToken,
    requestPermission,
    exchangeGuestToken: Phone.authenticate,
    registerPhone: Phone.register,
    dialPhone: Phone.dial,
    hangupPhone: Phone.hangup
  };
};

export default {
  create
};
