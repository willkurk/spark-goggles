import {
  registerPhone,
  registerPhoneSuccess,
  registerPhoneError,
  dialPhone,
  hangupPhone,
  acceptIncomingCall,
  rejectIncomingCall,
  callConnected,
  callDisconnected,
  callRinging,
  takeSnapshot,
  reducer,
  REGISTER_PHONE,
  REGISTER_PHONE_SUCCESS,
  REGISTER_PHONE_ERROR,
  DIAL_PHONE,
  HANGUP_PHONE,
  ACCEPT_INCOMING_CALL,
  REJECT_INCOMING_CALL,
  CALL_CONNECTED,
  CALL_DISCONNECTED,
  CALL_RINGING,
  TAKE_SNAPSHOT
} from './Phone';

const person = {
  email: 'user@example.com',
  isInitiator: true
};

test('registerPhone', () => {
  expect(registerPhone()).toEqual({
    type: REGISTER_PHONE,
    payload: {
      registration: {
        loading: true,
        complete: false,
        error: null
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
    payload: { localView, remoteView }
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
        ringing: false
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
        person: null,
        ringing: false
      }
    }
  });
});

test('callRinging', () => {
  expect(callRinging({ person })).toEqual({
    type: CALL_RINGING,
    payload: {
      call: {
        person,
        ringing: true
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
        ringing: false,
        person: null
      },
      registration: {
        loading: false,
        complete: false,
        error: null
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

  test('callConnected', () => {
    const now = Date.now();
    Date.now = jest.fn(() => now);

    const nextState = reducer(
      { ...state, call: { ...state.call, person, ringing: true } },
      callConnected()
    );

    expect(nextState).toMatchObject({
      call: {
        person,
        connected: new Date(Date.now()),
        ringing: false
      }
    });
  });

  test('callDisconnected', () => {
    const nextState = reducer(
      {
        ...state,
        call: { ...state.call, person, connected: new Date() }
      },
      callDisconnected()
    );

    expect(nextState).toMatchObject({
      call: {
        person: null,
        connected: null,
        ringing: false
      }
    });
  });

  test('callRinging', () => {
    expect(reducer(state, callRinging({ person }))).toMatchObject({
      call: {
        person,
        ringing: true,
        connected: null
      }
    });
  });

  test('dialPhone', () => {
    const action = dialPhone({
      localView: 'lv',
      removeView: 'rv',
      address: 'user@example.com'
    });

    expect(reducer(state, action)).toMatchObject({
      call: {
        ringing: true,
        person: {
          email: 'user@example.com'
        }
      }
    });
  });

  test('takeSnapshot', () => {
    const localView = 'localView';
    expect(takeSnapshot(localView)).toEqual({
      type: TAKE_SNAPSHOT,
      payload: {
        nativeID: localView
      }
    });
  });
});
