import { call, put } from 'redux-saga/effects';
import { update } from '../Redux/Phone';

export function* registerPhone(api) {
  yield put(update({ registration: { loading: true, complete: false } }));
  yield call(api.registerPhone);
  yield put(update({ registration: { loading: false, complete: true } }));
}
