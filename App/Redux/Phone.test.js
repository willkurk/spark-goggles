import {
  updateRegistration,
  updatePermissions,
  updateCall,
  requestPermissions,
  registerPhone,
  dialPhone,
  hangupPhone,
  reducer,
  UPDATE_REGISTRATION,
  UPDATE_PERMISSIONS,
  UPDATE_CALL,
  REQUEST_PERMISSIONS,
  REGISTER_PHONE,
  DIAL_PHONE,
  HANGUP_PHONE
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

test('updateCall', () => {
  const call = {
    connected: false,
    outgoing: true
  };

  expect(updateCall(call)).toEqual({
    type: UPDATE_CALL,
    payload: { call }
  });
});

test('requestPermissions', () => {
  expect(requestPermissions()).toEqual({
    type: REQUEST_PERMISSIONS
  });
});

test('registerPhone', () => {
  expect(registerPhone()).toEqual({
    type: REGISTER_PHONE
  });
});

test('dialPhone', () => {
  const payload = {
    address: '1234567',
    localView: 'localView',
    remoteView: 'remoteView'
  };

  expect(dialPhone(payload)).toEqual({
    type: DIAL_PHONE,
    payload
  });
});

test('hangupPhone', () => {
  expect(hangupPhone()).toEqual({
    type: HANGUP_PHONE
  });
});

describe('reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, { type: 'foobar' });
  });

  test('initial state', () => {
    expect(state).toEqual({
      call: {
        connected: false,
        outgoing: false,
        address: null
      },
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

  test('updateCall', () => {
    const nextState = reducer(
      state,
      updateCall({ address: 'foo@bar.com', connected: false, outgoing: true })
    );

    expect(nextState).toMatchObject({
      call: { address: 'foo@bar.com', connected: false, outgoing: true }
    });

    expect(
      reducer(nextState, updateCall({ connected: true, outgoing: false }))
    ).toMatchObject({
      call: { address: 'foo@bar.com', connected: true, outgoing: false }
    });
  });
});
