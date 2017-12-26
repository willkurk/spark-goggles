export const SET = 'currentUser/SET';
export const GENERATE_TOKEN = 'currentUser/GENERATE_TOKEN';

export const set = ({ data, loading }) => ({
  type: SET,
  data,
  loading
});

export const generateToken = (name, sub) => ({
  type: GENERATE_TOKEN,
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
