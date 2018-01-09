import {
  updatePermissions,
  updateCall,
  requestPermissions,
  registerPhone,
  registerPhoneSuccess,
  registerPhoneError,
  dialPhone,
  hangupPhone,
  reducer,
  UPDATE_PERMISSIONS,
  UPDATE_CALL,
  REQUEST_PERMISSIONS,
  REGISTER_PHONE,
  REGISTER_PHONE_SUCCESS,
  REGISTER_PHONE_ERROR,
  DIAL_PHONE,
  HANGUP_PHONE
} from './Phone';

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
    connected: null,
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
    type: REGISTER_PHONE,
    payload: {
      registration: {
        loading: true,
        complete: false
      }
    }
  });
});

test('registerPhoneSuccess', () => {
  expect(registerPhoneSuccess()).toEqual({
    type: REGISTER_PHONE_SUCCESS,
    payload: {
      registration: {
        loading: false,
        complete: true
      }
    }
  });
});

test('registerPhoneError', () => {
  expect(registerPhoneError()).toEqual({
    type: REGISTER_PHONE_ERROR,
    payload: {
      registration: {
        loading: false,
        complete: false
      }
    }
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
        connected: null,
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

  test('registerPhone', () => {
    expect(reducer(state, registerPhone())).toMatchObject({
      registration: {
        loading: true,
        complete: false
      }
    });
  });

  test('registerPhoneSuccess', () => {
    expect(reducer(state, registerPhoneSuccess())).toMatchObject({
      registration: {
        loading: false,
        complete: true
      }
    });
  });

  test('registerPhoneError', () => {
    expect(reducer(state, registerPhoneError())).toMatchObject({
      registration: {
        loading: false,
        complete: false
      }
    });
  });

  test('updatePermissions', () => {
    expect(reducer(state, updatePermissions(true))).toMatchObject({
      permissionsGranted: true
    });
  });

  test('dialPhone', () => {
    const address = 'user@example.com';

    expect(reducer(state, dialPhone({ address }))).toMatchObject({
      call: { address, connected: null, outgoing: true }
    });
  });

  test('updateCall', () => {
    const nextState = reducer(
      state,
      updateCall({ address: 'foo@bar.com', connected: null, outgoing: true })
    );

    expect(nextState).toMatchObject({
      call: { address: 'foo@bar.com', connected: null, outgoing: true }
    });

    expect(
      reducer(nextState, updateCall({ connected: true, outgoing: false }))
    ).toMatchObject({
      call: { address: 'foo@bar.com', connected: true, outgoing: false }
    });
  });
});
