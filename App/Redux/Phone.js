export const UPDATE_REGISTRATION = 'phone/UPDATE_REGISTRATION';
export const UPDATE_PERMISSIONS = 'phone/UPDATE_PERMISSIONS';

export const REGISTER_PHONE = 'phone/REGISTER_PHONE';
export const REQUEST_PERMISSIONS = 'phone/REQUEST_PERMISSIONS';

export const updateRegistration = registration => ({
  type: UPDATE_REGISTRATION,
  payload: { registration }
});

export const updatePermissions = permissionsGranted => ({
  type: UPDATE_PERMISSIONS,
  payload: { permissionsGranted }
});

export const requestPermissions = () => ({
  type: REQUEST_PERMISSIONS
});

export const registerPhone = () => ({
  type: REGISTER_PHONE
});

const INITIAL_STATE = {
  registration: { complete: false, loading: false },
  permissionsGranted: false
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_REGISTRATION:
    case UPDATE_PERMISSIONS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
