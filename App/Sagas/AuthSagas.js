import { call, put } from 'redux-saga/effects';

export function* generateToken(auth, name, sub) {
  const { data } = yield call(auth.generateToken, name, sub);
  yield put({ type: 'currentUser/SET', user: data });
}
