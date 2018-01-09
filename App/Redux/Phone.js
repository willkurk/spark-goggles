import { merge } from 'lodash';

export const UPDATE_PERMISSIONS = 'phone/UPDATE_PERMISSIONS';
export const UPDATE_CALL = 'phone/UPDATE_CALL';

export const REGISTER_PHONE = 'phone/REGISTER_PHONE';
export const REGISTER_PHONE_SUCCESS = 'phone/REGISTER_PHONE_SUCCESS';
export const REGISTER_PHONE_ERROR = 'phone/REGISTER_PHONE_ERROR';


export const REQUEST_PERMISSIONS = 'phone/REQUEST_PERMISSIONS';
export const DIAL_PHONE = 'phone/DIAL_PHONE';
export const HANGUP_PHONE = 'phone/HANGUP_PHONE';

export const updatePermissions = permissionsGranted => ({
  type: UPDATE_PERMISSIONS,
  payload: { permissionsGranted }
});

export const updateCall = call => ({
  type: UPDATE_CALL,
  payload: { call }
});

export const requestPermissions = () => ({
  type: REQUEST_PERMISSIONS
});

export const registerPhone = () => ({
  type: REGISTER_PHONE,
  payload: {
    registration: {
      loading: true,
      complete: false
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

export const registerPhoneError = () => ({
  type: REGISTER_PHONE_ERROR,
  payload: {
    registration: {
      loading: false,
      complete: false
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

const INITIAL_STATE = {
  registration: { complete: false, loading: false },
  call: { connected: null, outgoing: false, address: null },
  permissionsGranted: false
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER_PHONE:
    case REGISTER_PHONE_SUCCESS:
    case REGISTER_PHONE_ERROR:
    case UPDATE_PERMISSIONS:
    case UPDATE_CALL:
      return merge({}, state, action.payload);

    case DIAL_PHONE:
      return merge({}, state, {
        call: {
          outgoing: true,
          connected: null,
          address: action.payload.address
        }
      });

    default:
      return state;
  }
}
