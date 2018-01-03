import { call, put } from 'redux-saga/effects';
import { PermissionsAndroid } from 'react-native';
import { updateRegistration, updatePermissions } from '../Redux/Phone';

export function* registerPhone(api) {
  try {
    yield put(updateRegistration({ loading: true, complete: false }));
    yield call(api.registerPhone);
    yield put(updateRegistration({ loading: false, complete: true }));
  } catch (err) {
    yield put(updateRegistration({ loading: false, complete: false }));
  }
}

export function* requestPermissions(api) {
  try {
    yield call(api.requestPermissions, PermissionsAndroid.PERMISSIONS.CAMERA);
    yield call(api.requestPermissions, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
    yield put(updatePermissions(true));
  } catch (err) {
    yield put(updatePermissions(false));
  }
}
