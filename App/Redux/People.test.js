import {
  GET_PEOPLE,
  GET_PEOPLE_SUCCESS,
  GET_PEOPLE_ERROR,
  getPeople,
  getPeopleSuccess,
  getPeopleError,
  reducer
} from './People';

test('getPeople', () => {
  expect(getPeople()).toEqual({
    type: GET_PEOPLE,
    payload: {
      data: null,
      error: null,
      loading: true
    }
  });
});

test('getPeopleSuccess', () => {
  expect(getPeopleSuccess([{ id: 'foo' }])).toEqual({
    type: GET_PEOPLE_SUCCESS,
    payload: {
      data: [{ id: 'foo' }],
      error: null,
      loading: false
    }
  });
});

test('getPeopleError', () => {
  expect(getPeopleError('Nope!')).toEqual({
    type: GET_PEOPLE_ERROR,
    payload: {
      data: null,
      error: 'Nope!',
      loading: false
    }
  });
});

describe('reducer', () => {
  let state;
  beforeEach(() => {
    state = reducer(undefined, {});
  });

  test('initial state', () => {
    expect(state).toEqual({
      loading: false,
      error: null,
      data: null
    });
  });

  test('getPeople', () => {
    expect(reducer(state, getPeople())).toEqual({
      loading: true,
      error: null,
      data: null
    });
  });

  test('getPeopleSuccess', () => {
    expect(reducer(state, getPeopleError('Nope!'))).toEqual({
      loading: false,
      error: 'Nope!',
      data: null
    });
  });

  test('getPeopleError', () => {
    expect(reducer(state, getPeopleSuccess([{ id: 'foo' }]))).toEqual({
      loading: false,
      error: null,
      data: [{ id: 'foo' }]
    });
  });
});
