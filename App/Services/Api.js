import axios from 'axios';
import Config from 'react-native-config';
import querystring from 'querystring';
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

const buildQuery = (url, params) => {
  return `${url}?${querystring.stringify(params)}`;
};

const create = () => {
  const requestPermission = async name => {
    const granted = await PermissionsAndroid.request(name);

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      throw new Error('Failed to grant permission.');
    }
  };

  const dialPhone = async ({ address, localView, remoteView }) => {
    return Phone.dial(address, localView, remoteView);
  };

  const addPhoneListener = callback => {
    PHONE_EVENTS.forEach(eventName => {
      DeviceEventEmitter.addListener(eventName, _event => {
        callback({ type: eventName });
      });
    });
  };

  const removePhoneListener = callback => {
    PHONE_EVENTS.forEach(eventName => {
      DeviceEventEmitter.removeListener(eventName, callback);
    });
  };

  const buildClient = token =>
    axios.create({
      baseURL: Config.SPARK_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

  const sendMessage = (accessToken, params) =>
    buildClient(accessToken).post('/messages', params);

  const getMessages = (accessToken, params) =>
    buildClient(accessToken).get(buildQuery('/messages', params));

  return {
    addPhoneListener,
    authenticate: Phone.authenticate,
    getAccessToken: Phone.getAccessToken,
    dialPhone,
    getMessages,
    hangupPhone: Phone.hangup,
    registerPhone: Phone.register,
    removePhoneListener,
    requestPermission,
    sendMessage
  };
};

export default {
  create
};
