import { eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { PermissionsAndroid } from 'react-native';
import {
  updateRegistration,
  updatePermissions,
  updateCall
} from '../Redux/Phone';

/**
 * Spark requires us to register the phone in order to make/receive calls.
 * I think this is basically just establishing a websocket connection.
 */
export function* registerPhone(api) {
  try {
    yield put(updateRegistration({ loading: true, complete: false }));
    yield call(api.registerPhone);
    yield put(updateRegistration({ loading: false, complete: true }));
  } catch (err) {
    yield put(updateRegistration({ loading: false, complete: false }));
  }
}

/**
 * Watch the phone for events. Anytime a call connects or disconnects,
 * we'll update state
 */
export function* observePhone(api) {
  const createChannel = () => eventChannel(emit => api.observePhone(emit));
  const channel = yield call(createChannel);

  while (true) {
    const event = yield take(channel);

    switch (event.type) {
      case 'phone:connected':
        yield put(updateCall({ outgoing: false, connected: true }));
        break;

      case 'phone:disconnected':
        yield put(updateCall({ outgoing: false, connected: true }));
        break;

      default:
        break;
    }
  }
}

/**
 * Request permission to use the camera and audio devices
 */
export function* requestPermissions(api) {
  try {
    yield call(api.requestPermissions, PermissionsAndroid.PERMISSIONS.CAMERA);
    yield call(
      api.requestPermissions,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    );
    yield put(updatePermissions(true));
  } catch (err) {
    yield put(updatePermissions(false));
  }
}

/**
 * Dial the phone. What else do you need to know?
 */
export function* dialPhone(api, { payload }) {
  try {
    yield put(updateCall({ outgoing: true, connected: false }));
    yield call(api.dialPhone, payload);
  } catch (err) {
    yield put(updateCall({ outgoing: false, connected: false }));
  }
}
