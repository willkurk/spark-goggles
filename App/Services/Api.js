import axios from 'axios';
import promiseRetry from 'promise-retry';
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

  const exchangeGuestToken = jwt => {
    return promiseRetry(
      (retry, number) => {
        return Phone.authenticate(jwt)
          .catch(error => {
            console.warn(
              `Failed to exchangeGuestToken ${number} times.`,
              error
            );

            throw error;
          })
          .catch(retry);
      },
      {
        retries: 5,
        minTimeout: 500
      }
    );
  };

  return {
    generateGuestToken,
    requestPermission,
    dialPhone,
    addPhoneListener,
    removePhoneListener,
    exchangeGuestToken,
    registerPhone: Phone.register,
    hangupPhone: Phone.hangup
  };
};

export default {
  create
};
