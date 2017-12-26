import { call, put } from 'redux-saga/effects';
import { set } from '../Redux/CurrentUser';

export function* generateToken(auth, { name, sub }) {
  yield put(set({ loading: true, data: null }));
  const { data: { token: jwt } } = yield call(auth.generateToken, name, sub);
  const { data: { token: accessToken } } = yield call(auth.exchangeToken, jwt)
  yield put(set({ loading: false, data: accessToken }));
}
