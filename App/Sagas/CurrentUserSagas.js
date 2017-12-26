import { call, put } from 'redux-saga/effects';
import { set } from '../Redux/CurrentUser';

export function* generateToken(auth, { name, sub }) {
  yield put(set({ loading: true, data: null }));
  const { data } = yield call(auth.generateToken, name, sub);
  yield put(set({ loading: false, data }));
}
