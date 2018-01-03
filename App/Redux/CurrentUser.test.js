import { reducer, set, authenticate, SET, AUTHENTICATE} from './CurrentUser';

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
  const name = 'Rick';
  const sub = 'ross';

  expect(authenticate({ name, sub })).toEqual({
    type: AUTHENTICATE,
    payload: {
      name,
      sub
    }
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
    expect(
      reducer(state, set({ data: user, loading: false }))
    ).toEqual({
      data: user,
      loading: false
    });
  });
});
