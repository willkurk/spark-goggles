import {
  updateRegistration,
  updatePermissions,
  reducer,
  UPDATE_REGISTRATION,
  UPDATE_PERMISSIONS
} from './Phone';

test('updateRegistration', () => {
  expect(updateRegistration({ loading: true, complete: false })).toEqual({
    type: UPDATE_REGISTRATION,
    payload: {
      registration: {
        loading: true,
        complete: false
      }
    }
  });
});

test('updatePermissions', () => {
  expect(updatePermissions(true)).toEqual({
    type: UPDATE_PERMISSIONS,
    payload: {
      permissionsGranted: true
    }
  });
});

describe('reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, { type: 'foobar' });
  });

  test('initial state', () => {
    expect(state).toEqual({
      registration: {
        loading: false,
        complete: false
      },
      permissionsGranted: false
    });
  });

  test('updateRegistration', () => {
    expect(
      reducer(state, updateRegistration({ loading: true, complete: false }))
    ).toMatchObject({
      registration: {
        loading: true,
        complete: false
      }
    });
  });

  test('updatePermissions', () => {
    expect(reducer(state, updatePermissions(true))).toMatchObject({
      permissionsGranted: true
    });
  });
});
