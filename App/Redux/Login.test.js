import {
  reducer,
  set,
  authenticate,
  refreshToken,
  SET,
  AUTHENTICATE,
  REFRESH_TOKEN
} from './Login';

const user = {
  name: 'Rick',
  sub: 'ross',
  token: '12456789'
};

test('set', () => {
  expect(set({ data: user, loading: false })).toEqual({
    type: SET,
    payload: {
      data: user,
      loading: false
    }
  });
});

test('authenticate', () => {
  const code = '123456789';

  expect(authenticate({ code })).toEqual({
    type: AUTHENTICATE,
    payload: { code }
  });
});

test('refreshToken', () => {
  expect(refreshToken()).toEqual({
    type: REFRESH_TOKEN
  });
});

describe('reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, { type: 'foobar' });
  });

  test('initial state', () => {
    expect(state).toEqual({ data: null, loading: false });
  });

  test('set', () => {
    expect(reducer(state, set({ data: user, loading: false }))).toEqual({
      data: user,
      loading: false
    });
  });
});
