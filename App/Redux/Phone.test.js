import {
  updatePermissions,
  requestPermissions,
  registerPhone,
  registerPhoneSuccess,
  registerPhoneError,
  dialPhone,
  hangupPhone,
  acceptIncomingCall,
  rejectIncomingCall,
  callConnected,
  callDisconnected,
  callIncoming,
  reducer,
  UPDATE_PERMISSIONS,
  REQUEST_PERMISSIONS,
  REGISTER_PHONE,
  REGISTER_PHONE_SUCCESS,
  REGISTER_PHONE_ERROR,
  DIAL_PHONE,
  HANGUP_PHONE,
  ACCEPT_INCOMING_CALL,
  REJECT_INCOMING_CALL,
  CALL_CONNECTED,
  CALL_DISCONNECTED,
  CALL_INCOMING
} from './Phone';

test('updatePermissions', () => {
  expect(updatePermissions(true)).toEqual({
    type: UPDATE_PERMISSIONS,
    payload: {
      permissionsGranted: true
    }
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

test('acceptIncomingCall', () => {
  const localView = 'localView';
  const remoteView = 'remoteView';

  expect(acceptIncomingCall({ localView, remoteView })).toEqual({
    type: ACCEPT_INCOMING_CALL,
    payload: {
      call: { localView, remoteView }
    }
  });
});

test('rejectIncomingCall', () => {
  expect(rejectIncomingCall()).toEqual({
    type: REJECT_INCOMING_CALL
  });
});

test('callConnected', () => {
  const now = Date.now();
  Date.now = jest.fn(() => now);

  expect(callConnected()).toEqual({
    type: CALL_CONNECTED,
    payload: {
      call: {
        connected: new Date(Date.now()),
        outgoing: false,
        incoming: false
      }
    }
  });
});

test('callDisconnected', () => {
  expect(callDisconnected()).toEqual({
    type: CALL_DISCONNECTED,
    payload: {
      call: {
        connected: null,
        address: null,
        outgoing: false,
        incoming: false
      }
    }
  });
});

test('callIncoming', () => {
  const address = 'user@example.com';

  expect(callIncoming({ address })).toEqual({
    type: CALL_INCOMING,
    payload: {
      call: {
        address,
        incoming: true
      }
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
      call: {
        connected: null,
        outgoing: false,
        incoming: false,
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

  test('callConnected', () => {
    const now = Date.now();
    Date.now = jest.fn(() => now);

    const nextState = reducer(
      { ...state, call: { ...state.call, address: 'foo@bar.com' } },
      callConnected()
    );

    expect(nextState).toMatchObject({
      call: {
        address: 'foo@bar.com',
        connected: new Date(Date.now()),
        outgoing: false
      }
    });
  });

  test('callDisconnected', () => {
    const nextState = reducer(
      {
        ...state,
        call: { ...state.call, address: 'foo@bar.com', connected: new Date() }
      },
      callDisconnected()
    );

    expect(nextState).toMatchObject({
      call: {
        address: null,
        connected: null,
        outgoing: false
      }
    });
  });

  test('callIncoming', () => {
    const address = 'user@example.com';

    expect(reducer(state, callIncoming({ address }))).toMatchObject({
      call: {
        address,
        incoming: true
      }
    });
  });
});
