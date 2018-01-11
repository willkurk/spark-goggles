import { eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { PermissionsAndroid } from 'react-native';
import { startPollingMessages, stopPollingMessages } from '../Redux/Messages';
import {
  updatePermissions,
  registerPhoneSuccess,
  registerPhoneError,
  callConnected,
  callDisconnected,
  callRinging
} from '../Redux/Phone';

const getPerson = ({ from, to, direction }) => {
  if (direction === 'INCOMING') {
    return from;
  }

  if (direction === 'OUTGOING') {
    return to;
  }

  throw new Error("This call data is weird and I don't know what to do.");
};

/**
 * Spark requires us to register the phone in order to make/receive calls.
 * I think this is basically just establishing a websocket connection.
 */
export function* registerPhone(api) {
  try {
    yield call(api.registerPhone);
    yield put(registerPhoneSuccess());
  } catch (err) {
    yield put(registerPhoneError(err));
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
    const action = yield take(channel);

    switch (action.type) {
      case 'phone:connected': {
        yield put(callConnected());
        yield put(
          startPollingMessages({
            exploratoryMessage: 'Hello',
            address: getPerson(action.payload).email
          })
        );
        break;
      }

      case 'phone:disconnected': {
        yield put(callDisconnected());
        yield put(stopPollingMessages());
        break;
      }

      case 'phone:ringing': {
        yield put(callRinging({ person: getPerson(action.payload) }));
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

export function* acceptIncomingCall(api, { payload }) {
  yield call(api.acceptIncomingCall, payload);
}

export function* rejectIncomingCall(api) {
  yield call(api.rejectIncomingCall);
}

export function* takeSnapshot(api, { payload }) {
  yield call(api.takeSnapshot, payload.nativeID);
}
