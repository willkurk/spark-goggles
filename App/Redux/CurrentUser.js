export const SET = 'currentUser/SET';
export const AUTHENTICATE = 'currentUser/AUTHENTICATE';

export const set = ({ data, loading }) => ({
  type: SET,
  data,
  loading
});

export const authenticate = ({ name, sub }) => ({
  type: AUTHENTICATE,
  name,
  sub
});

const INITIAL_STATE = {
  data: null,
  loading: false
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET: {
      const { loading, data } = action;
      return { loading, data };
    }

    default:
      return state;
  }
}
