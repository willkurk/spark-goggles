import { reducer, set, generateToken } from './CurrentUser';

const user = {
  name: 'Rick',
  sub: 'ross',
  token: '12456789'
};

test('set', () => {
  expect(set({ data: user, loading: false })).toEqual({
    type: 'currentUser/SET',
    data: user,
    loading: false
  });
});

test('generateToken', () => {
  const name = 'Rick';
  const sub = 'ross';

  expect(generateToken(name, sub)).toEqual({
    type: 'currentUser/GENERATE_TOKEN',
    name,
    sub
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
