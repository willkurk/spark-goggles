export const UPDATE_REGISTRATION = 'phone/UPDATE_REGISTRATION';
export const UPDATE_PERMISSIONS = 'phone/UPDATE_PERMISSIONS';

export const updateRegistration = registration => ({
  type: UPDATE_REGISTRATION,
  payload: { registration }
});

export const updatePermissions = permissionsGranted => ({
  type: UPDATE_PERMISSIONS,
  payload: { permissionsGranted }
})

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
