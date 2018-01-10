import { merge } from 'lodash';

export const REQUEST_PERMISSIONS = 'phone/REQUEST_PERMISSIONS';
export const UPDATE_PERMISSIONS = 'phone/UPDATE_PERMISSIONS';

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

export const updatePermissions = permissionsGranted => ({
  type: UPDATE_PERMISSIONS,
  payload: { permissionsGranted }
});

export const requestPermissions = () => ({
  type: REQUEST_PERMISSIONS
});

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

export const dialPhone = ({ address, localView, remoteView }) => ({
  type: DIAL_PHONE,
  payload: { address, localView, remoteView }
});

export const hangupPhone = () => ({
  type: HANGUP_PHONE
});

export const acceptIncomingCall = ({ localView, remoteView }) => ({
  type: ACCEPT_INCOMING_CALL,
  payload: {
    localView,
    remoteView
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
    case UPDATE_PERMISSIONS:
    case CALL_CONNECTED:
    case CALL_DISCONNECTED:
    case CALL_RINGING:
      return merge({}, state, action.payload);

    default:
      return state;
  }
}
