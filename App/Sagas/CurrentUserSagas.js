import { call, put } from 'redux-saga/effects';
import { set } from '../Redux/CurrentUser';

export function* authenticate(api, { payload: { name, sub } }) {
  yield put(set({ loading: true, data: null }));

  const guestToken = yield call(api.generateGuestToken, { name, sub });
  const accessToken = yield call(api.exchangeGuestToken, guestToken);

  yield put(
    set({
      loading: false,
      data: {
        name,
        sub,
        accessToken
      }
    })
  );
}
