export const UPDATE = 'phone/UPDATE';

export const update = payload => ({
  type: UPDATE,
  payload
});

const INITIAL_STATE = {
  registration: { complete: false, loading: false }
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
