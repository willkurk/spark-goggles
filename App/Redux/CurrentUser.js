export const SET = 'currentUser/SET';
export const AUTHENTICATE = 'currentUser/AUTHENTICATE';

export const set = ({ data, loading }) => ({
  type: SET,
  payload: {
    data,
    loading
  }
});

export const authenticate = ({ name, sub }) => ({
  type: AUTHENTICATE,
  payload: {
    name,
    sub
  }
});

const INITIAL_STATE = {
  data: null,
  loading: false
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET: {
      const { loading, data } = action.payload;
      return { loading, data };
    }

    default:
      return state;
  }
}
