export const UPDATE_REGISTRATION = 'phone/UPDATE_REGISTRATION';
export const UPDATE_PERMISSIONS = 'phone/UPDATE_PERMISSIONS';
export const UPDATE_CALL = 'phone/UPDATE_CALL';

export const REGISTER_PHONE = 'phone/REGISTER_PHONE';
export const REQUEST_PERMISSIONS = 'phone/REQUEST_PERMISSIONS';
export const DIAL_PHONE = 'phone/DIAL_PHONE';
export const HANGUP_PHONE = 'phone/HANGUP_PHONE';

export const updateRegistration = registration => ({
  type: UPDATE_REGISTRATION,
  payload: { registration }
});

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
  type: REGISTER_PHONE
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
  call: { connected: false, outgoing: false },
  permissionsGranted: false
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_REGISTRATION:
    case UPDATE_PERMISSIONS:
    case UPDATE_CALL:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
