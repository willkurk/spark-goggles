import { merge } from 'lodash';

export const REGISTER_PHONE = 'phone/REGISTER_PHONE';
export const REGISTER_PHONE_SUCCESS = 'phone/REGISTER_PHONE_SUCCESS';
export const REGISTER_PHONE_ERROR = 'phone/REGISTER_PHONE_ERROR';

export const DIAL_PHONE = 'phone/DIAL_PHONE';
export const HANGUP_PHONE = 'phone/HANGUP_PHONE';

export const ACCEPT_INCOMING_CALL = 'phone/ACCEPT_INCOMING_CALL';
export const REJECT_INCOMING_CALL = 'phone/REJECT_INCOMING_CALL';

export const CALL_CONNECTED = 'phone/CALL_CONNECTED';
export const CALL_DISCONNECTED = 'phone/CALL_DISCONNECTED';
export const CALL_RINGING = 'phone/CALL_RINGING';

export const TAKE_SNAPSHOT = 'phone/TAKE_SNAPSHOT';

export const registerPhone = () => ({
  type: REGISTER_PHONE,
  payload: {
    registration: {
      loading: true,
      complete: false,
      error: null
    }
  }
});

export const registerPhoneSuccess = () => ({
  type: REGISTER_PHONE_SUCCESS,
  payload: {
    registration: {
      loading: false,
      complete: true
    }
  }
});

export const registerPhoneError = error => ({
  type: REGISTER_PHONE_ERROR,
  payload: {
    registration: {
      loading: false,
      complete: false,
      error
    }
  }
});

export const dialPhone = ({ address, localView, remoteView, sharingView }) => ({
  type: DIAL_PHONE,
  payload: { address, localView, remoteView, sharingView }
});

export const hangupPhone = () => ({
  type: HANGUP_PHONE
});

export const acceptIncomingCall = ({ localView, remoteView, sharingView }) => ({
  type: ACCEPT_INCOMING_CALL,
  payload: {
    localView,
    remoteView,
    sharingView
  }
});

export const rejectIncomingCall = () => ({
  type: REJECT_INCOMING_CALL
});

export const callConnected = () => ({
  type: CALL_CONNECTED,
  payload: {
    call: {
      ringing: false,
      connected: new Date(Date.now())
    }
  }
});

export const callDisconnected = () => ({
  type: CALL_DISCONNECTED,
  payload: {
    call: {
      ringing: false,
      connected: null,
      person: null
    }
  }
});

export const callRinging = ({ person }) => ({
  type: CALL_RINGING,
  payload: {
    call: {
      ringing: true,
      person
    }
  }
});

export const takeSnapshot = nativeID => ({
  type: TAKE_SNAPSHOT,
  payload: {
    nativeID
  }
});

const INITIAL_STATE = {
  registration: { error: null, complete: false, loading: false },
  call: { connected: null, ringing: false, person: null },
  permissionsGranted: false
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER_PHONE:
    case REGISTER_PHONE_SUCCESS:
    case REGISTER_PHONE_ERROR:
    case CALL_CONNECTED:
    case CALL_DISCONNECTED:
    case CALL_RINGING:
      return merge({}, state, action.payload);

    case DIAL_PHONE:
      return merge({}, state, {
        call: {
          ringing: true,
          person: { email: action.payload.address }
        }
      });

    default:
      return state;
  }
}
