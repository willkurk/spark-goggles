import {
  reducer,
  authenticate,
  grantAccess,
  revokeAccess,
  AUTHENTICATE,
  GRANT_ACCESS,
  REVOKE_ACCESS
} from './Login';

test('authenticate', () => {
  expect(authenticate()).toEqual({
    type: AUTHENTICATE
  });
});

test('grantAccess', () => {
  expect(grantAccess()).toEqual({
    type: GRANT_ACCESS
  });
});

test('revokeAccess', () => {
  expect(revokeAccess('Ahh!')).toEqual({
    type: REVOKE_ACCESS,
    payload: {
      error: 'Ahh!'
    }
  });
});

describe('reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({ error: null, loading: false });
  });

  test('authenticate', () => {
    expect(reducer({ error: 'foo', loading: false }, authenticate())).toEqual({
      error: null,
      loading: true
    });
  });

  test('grantAccess', () => {
    expect(reducer({ error: 'foo', loading: true }, grantAccess())).toEqual({
      error: null,
      loading: false
    });
  });

  test('revokeAccess', () => {
    expect(
      reducer({ error: 'foo', loading: true }, revokeAccess('bar'))
    ).toEqual({
      error: 'bar',
      loading: false
    });
  });
});
