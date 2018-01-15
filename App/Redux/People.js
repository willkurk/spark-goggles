export const GET_PEOPLE = 'rooms/GET_PEOPLE';
export const GET_PEOPLE_SUCCESS = 'rooms/GET_PEOPLE_SUCCESS';
export const GET_PEOPLE_ERROR = 'rooms/GET_PEOPLE_ERROR';

export const getPeople = () => ({
  type: GET_PEOPLE,
  payload: { data: null, error: null, loading: true }
});

export const getPeopleSuccess = data => ({
  type: GET_PEOPLE_SUCCESS,
  payload: { data, error: null, loading: false }
});

export const getPeopleError = error => ({
  type: GET_PEOPLE_ERROR,
  payload: { error, data: null, loading: false }
});

const INITIAL_STATE = {
  loading: false,
  error: null,
  data: null
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PEOPLE:
    case GET_PEOPLE_SUCCESS:
    case GET_PEOPLE_ERROR:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
