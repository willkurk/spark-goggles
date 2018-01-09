import { eventChannel } from 'redux-saga';
import { call, put, take, select } from 'redux-saga/effects';
import { PermissionsAndroid } from 'react-native';
import { startPollingMessages, stopPollingMessages } from '../Redux/Messages';
import {
  updatePermissions,
  registerPhoneSuccess,
  registerPhoneError,
  callConnected,
  callDisconnected
} from '../Redux/Phone';

/**
 * Spark requires us to register the phone in order to make/receive calls.
 * I think this is basically just establishing a websocket connection.
 */
export function* registerPhone(api) {
  try {
    yield call(api.registerPhone);
    yield put(registerPhoneSuccess());
  } catch (err) {
    yield put(registerPhoneError());
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
      case 'phone:connected': {
        yield put(callConnected());

        const address = yield select(state => state.phone.call.address);

        yield put(
          startPollingMessages({ exploratoryMessage: 'Hello', address })
        );

        break;
      }

      case 'phone:disconnected': {
        yield put(callDisconnected());
        yield put(stopPollingMessages());
        break;
      }

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
  try {
    yield call(api.dialPhone, payload);
  } catch (err) {
    yield put(callDisconnected());
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
