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

  return {
    requestPermission,
    dialPhone,
    addPhoneListener,
    removePhoneListener,
    authenticate: Phone.authenticate,
    registerPhone: Phone.register,
    hangupPhone: Phone.hangup
  };
};

export default {
  create
};
