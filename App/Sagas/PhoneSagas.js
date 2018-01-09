import { eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { PermissionsAndroid } from 'react-native';
import { stopPollingMessages } from '../Redux/Messages';
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
  yield put(updateRegistration({ loading: true, complete: false }));

  try {
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
  const createChannel = () =>
    eventChannel(emit => {
      api.addPhoneListener(emit);
      return () => api.removePhoneListener(emit);
    });

  const channel = yield call(createChannel);

  while (true) {
    const event = yield take(channel);

    switch (event.type) {
      case 'phone:connected':
        yield put(
          updateCall({ outgoing: false, connected: new Date(Date.now()) })
        );
        break;

      case 'phone:disconnected':
        yield put(
          updateCall({ outgoing: false, connected: null, address: null })
        );
        yield put(stopPollingMessages());
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
    yield call(api.requestPermission, PermissionsAndroid.PERMISSIONS.CAMERA);
    yield call(
      api.requestPermission,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    );
    yield put(updatePermissions(true));
  } catch (err) {
    yield put(updatePermissions(false));
  }
}

/**
 * Dial the phone. Take a look at `observePhone`. That's where
 * we'll find out that the call has been accepted.
 */
export function* dialPhone(api, { payload }) {
  yield put(
    updateCall({ outgoing: true, connected: null, address: payload.address })
  );

  try {
    yield call(api.dialPhone, payload);
  } catch (err) {
    yield put(updateCall({ outgoing: false, connected: null }));
  }
}

/**
 * Hangup the phone.
 */
export function* hangupPhone(api) {
  try {
    yield call(api.hangupPhone);
  } catch (err) {
    // nothing?
  }
}
