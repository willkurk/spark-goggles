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

  const dialPhone = async ({ address, localView, remoteView, sharingView }) => {
    return Phone.dial(address, localView, remoteView, sharingView);
  };

  const acceptIncomingCall = async ({ localView, remoteView, sharingView }) => {
    return Phone.answerIncomingCall(localView, remoteView, sharingView);
  };

  const addPhoneListener = callback => {
    PHONE_EVENTS.forEach(eventName => {
      DeviceEventEmitter.addListener(eventName, payload => {
        console.tron.display({
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

  const getMessages = (accessToken, params) =>
    buildClient(accessToken).get(buildQuery('/messages', params));

  const getTeams = accessToken => buildClient(accessToken).get('/teams');

  const getTeamMembers = (accessToken, teamId) =>
    buildClient(accessToken).get(buildQuery('/team/memberships', { teamId }));

  return {
    acceptIncomingCall,
    addPhoneListener,
    authenticate: Phone.authenticate,
    getAccessToken: Phone.getAccessToken,
    dialPhone,
    getMessages,
    getTeams,
    getTeamMembers,
    hangupPhone: Phone.hangup,
    registerPhone: Phone.register,
    rejectIncomingCall: Phone.rejectIncomingCall,
    removePhoneListener,
    requestPermission,
    sendMessage,
    takeSnapshot: Phone.takeSnapshot
  };
};

export default {
  create
};
