import { eventChannel } from 'redux-saga';
import { PermissionsAndroid } from 'react-native';
import { call, put, take } from 'redux-saga/effects';
import FixtureApi from '../../App/Services/FixtureApi';

import {
  observePhone,
  registerPhone,
  requestPermissions,
  dialPhone,
  hangupPhone
} from './PhoneSagas';

import {
  registerPhoneSuccess,
  registerPhoneError,
  updatePermissions,
  callConnected,
  callDisconnected,
  callRinging
} from '../Redux/Phone';

import { startPollingMessages, stopPollingMessages } from '../Redux/Messages';

const address = 'meatloaf';
const localView = 'localView';
const remoteView = 'remoteView';

test('registerPhone', () => {
  const saga = registerPhone(FixtureApi);

  expect(saga.next().value).toEqual(call(FixtureApi.registerPhone));

  expect(saga.next().value).toEqual(put(registerPhoneSuccess()));
});

test('registerPhone failure', () => {
  const saga = registerPhone(FixtureApi);
  const error = new Error('my error');

  saga.next();
  saga.next();

  expect(saga.throw(error).value).toEqual(put(registerPhoneError(error)));

  expect(saga.next().done).toBeTruthy();
});

test('requestPermissions', () => {
  const saga = requestPermissions(FixtureApi);

  expect(saga.next().value).toEqual(
    call(FixtureApi.requestPermission, PermissionsAndroid.PERMISSIONS.CAMERA)
  );

  expect(saga.next().value).toEqual(
    call(
      FixtureApi.requestPermission,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    )
  );

  expect(saga.next().value).toEqual(put(updatePermissions(true)));
});

test('requestPermissions failure', () => {
  const saga = requestPermissions(FixtureApi);
  saga.next();

  expect(saga.throw(new Error('no cameras')).value).toEqual(
    put(updatePermissions(false))
  );
});

test('dialPhone', () => {
  const saga = dialPhone(FixtureApi, {
    payload: { address, localView, remoteView }
  });

  expect(saga.next().value).toEqual(
    call(FixtureApi.dialPhone, { address, localView, remoteView })
  );
});

test('dialPhone failure', () => {
  const saga = dialPhone(FixtureApi, {
    payload: { address, localView, remoteView }
  });

  saga.next();

  expect(saga.throw(new Error('Whoops!')).value).toEqual(
    put(callDisconnected())
  );
});

test('hangupPhone', () => {
  const saga = hangupPhone(FixtureApi);

  expect(saga.next().value).toEqual(call(FixtureApi.hangupPhone));
});

describe('observePhone', () => {
  const from = { email: 'from@example.com' };
  const to = { email: 'to@example.com' };

  let saga;
  let channel;

  beforeEach(() => {
    const now = Date.now();
    Date.now = jest.fn(() => now);

    saga = observePhone(FixtureApi);
    channel = eventChannel(_emit => {
      return () => null;
    });

    saga.next(); // create the channel
    expect(saga.next(channel).value).toEqual(take(channel));
  });

  test('phone:connected', () => {
    const action = {
      type: 'phone:connected',
      payload: { from, to, direction: 'INCOMING' }
    };

    expect(saga.next(action).value).toEqual(put(callConnected()));
    expect(saga.next().value).toEqual(
      put(
        startPollingMessages({
          exploratoryMessage: 'Hello',
          address: from.email
        })
      )
    );
  });

  test('phone:disconnected', () => {
    const action = {
      type: 'phone:disconnected',
      payload: { from, to, direction: 'INCOMING' }
    };

    expect(saga.next(action).value).toEqual(put(callDisconnected()));
    expect(saga.next().value).toEqual(put(stopPollingMessages()));
  });

  test('phone:ringing', () => {
    const action = {
      type: 'phone:ringing',
      payload: { from, to, direction: 'INCOMING' }
    };

    expect(saga.next(action).value).toEqual(put(callRinging({ person: from })));
  });
});
