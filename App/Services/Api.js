import axios from 'axios';
import Config from 'react-native-config';
import Reactotron from 'reactotron-react-native';
import querystring from 'querystring';
import {
  NativeModules,
  PermissionsAndroid,
  DeviceEventEmitter
} from 'react-native';

const { Phone } = NativeModules;

const PHONE_EVENTS = [
  'phone:ringing',
  'phone:incoming',
  'phone:connected',
  'phone:disconnected',
  'phone:media-changed',
  'phone:snapshot'
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

  const acceptIncomingCall = async ({ localView, remoteView }) => {
    return Phone.answerIncomingCall(localView, remoteView);
  };

  const addPhoneListener = callback => {
    PHONE_EVENTS.forEach(eventName => {
      DeviceEventEmitter.addListener(eventName, payload => {
        Reactotron.display({
          name: 'PHONE',
          preview: eventName,
          value: {
            type: eventName,
            payload
          }
        });

        callback({ type: eventName, payload });
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

  const sendMessage = (accessToken, { files, ...params }) => {
    const form = new FormData();

    Object.keys(params).forEach(key => {
      form.append(key, params[key]);
    });

    (files || []).forEach(uri => {
      form.append('files', {
        uri,
        type: 'image/jpeg',
        name: `${Date.now()}.jpeg`
      });
    });

    return buildClient(accessToken).post('/messages', form);
  };

  const takeSnapshot = () => {
    console.log('calling Phone.emitEvent');
    Phone.takeSnapshot({});
  };

  const getMessages = (accessToken, params) =>
    buildClient(accessToken).get(buildQuery('/messages', params));

  return {
    acceptIncomingCall,
    addPhoneListener,
    authenticate: Phone.authenticate,
    getAccessToken: Phone.getAccessToken,
    dialPhone,
    getMessages,
    hangupPhone: Phone.hangup,
    registerPhone: Phone.register,
    rejectIncomingCall: Phone.rejectIncomingCall,
    removePhoneListener,
    requestPermission,
    sendMessage,
    takeSnapshot
  };
};

export default {
  create
};
