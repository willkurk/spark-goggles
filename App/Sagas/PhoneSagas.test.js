import { PermissionsAndroid } from 'react-native';
import { call, put } from 'redux-saga/effects';
import FixtureApi from '../../App/Services/FixtureApi';
import { registerPhone, requestPermissions } from './PhoneSagas';
import { updateRegistration, updatePermissions } from '../Redux/Phone';

test('registerPhone', () => {
  const saga = registerPhone(FixtureApi);

  expect(saga.next().value).toEqual(
    put(updateRegistration({ loading: true, complete: false }))
  );

  expect(saga.next().value).toEqual(call(FixtureApi.registerPhone));

  expect(saga.next().value).toEqual(
    put(updateRegistration({ loading: false, complete: true }))
  );
});

test('registerPhone failure', () => {
  const saga = registerPhone(FixtureApi);

  expect(saga.next().value).toEqual(
    put(updateRegistration({ loading: true, complete: false }))
  );

  expect(saga.throw(new Error('my error')).value).toEqual(
    put(updateRegistration({ loading: false, complete: false }))
  );

  expect(saga.next().done).toBeTruthy();
});

test('requestPermissions', () => {
  const saga = requestPermissions(FixtureApi);

  expect(saga.next().value).toEqual(
    call(FixtureApi.requestPermissions, PermissionsAndroid.PERMISSIONS.CAMERA)
  );

  expect(saga.next().value).toEqual(
    call(
      FixtureApi.requestPermissions,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    )
  );

  expect(saga.next().value).toEqual(put(updatePermissions(true)));
});

test('requestPermissions failure', () => {
  const saga = requestPermissions(FixtureApi);

  expect(saga.next().value).toEqual(
    call(FixtureApi.requestPermissions, PermissionsAndroid.PERMISSIONS.CAMERA)
  );

  expect(saga.throw(new Error('no cameras')).value).toEqual(
    put(updatePermissions(false))
  );
});
