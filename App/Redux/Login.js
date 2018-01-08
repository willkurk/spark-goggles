export const AUTHENTICATE = 'login/AUTHENTICATE';
export const GRANT_ACCESS = 'login/GRANT_ACCESS';
export const REVOKE_ACCESS = 'login/REVOKE_ACCESS';

export const authenticate = () => ({
  type: AUTHENTICATE
});

export const grantAccess = () => ({
  type: GRANT_ACCESS
});

export const revokeAccess = error => ({
  type: REVOKE_ACCESS,
  payload: {
    error: error
  }
});

const INITIAL_STATE = {
  error: null,
  loading: false
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return { error: null, loading: true };

    case GRANT_ACCESS:
      return { error: null, loading: false };

    case REVOKE_ACCESS:
      return { error: action.payload.error, loading: false };

    default:
      return state;
  }
}
