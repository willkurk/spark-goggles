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
  callDisconnected
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

  saga.next();
  saga.next();

  expect(saga.throw(new Error('my error')).value).toEqual(
    put(registerPhoneError())
  );

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

test('observePhone', () => {
  const now = Date.now();
  Date.now = jest.fn(() => now);

  const saga = observePhone(FixtureApi);

  const channel = eventChannel(_emit => {
    return () => null;
  });

  expect(saga.next().value).toMatchObject({
    CALL: { args: [] }
  });

  expect(saga.next(channel).value).toEqual(take(channel));

  expect(saga.next({ type: 'phone:connected' }).value).toEqual(
    put(callConnected())
  );
  expect(saga.next().value).toMatchObject({ SELECT: { args: [] } });

  expect(saga.next(address).value).toEqual(
    put(
      startPollingMessages({
        exploratoryMessage: 'Hello',
        address
      })
    )
  );

  expect(saga.next(channel).value).toEqual(take(channel));

  expect(saga.next({ type: 'phone:disconnected' }).value).toEqual(
    put(callDisconnected())
  );

  expect(saga.next().value).toEqual(put(stopPollingMessages()));

  saga.return(); // this generator contains a while loop. abort it.
});

test('hangupPhone', () => {
  const saga = hangupPhone(FixtureApi);

  expect(saga.next().value).toEqual(call(FixtureApi.hangupPhone));
});
