export const AUTHENTICATE = 'login/AUTHENTICATE';
export const GRANT_ACCESS = 'login/GRANT_ACCESS';
export const REVOKE_ACCESS = 'login/REVOKE_ACCESS';

export const authenticate = () => ({
  type: AUTHENTICATE
});

export const grantAccess = () => ({
  type: GRANT_ACCESS,
  payload: {
    error: null,
    loading: false
  }
});

export const revokeAccess = (error = null) => ({
  type: REVOKE_ACCESS,
  payload: {
    error: error,
    loading: false
  }
});

const INITIAL_STATE = {
  error: null,
  loading: false
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return { ...INITIAL_STATE, loading: true };

    case GRANT_ACCESS:
    case REVOKE_ACCESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
