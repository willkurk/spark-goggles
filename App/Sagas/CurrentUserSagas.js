import { call, put } from 'redux-saga/effects';
import { set } from '../Redux/CurrentUser';

export function* authenticate(api, { payload: { code } }) {
  yield put(set({ loading: true, data: null }));

  try {
    const accessToken = yield call(api.authenticate, code);
    yield put(set({ loading: false, data: { accessToken } }));
  } catch (error) {
    yield put(set({ loading: false, data: null }));
  }
}
