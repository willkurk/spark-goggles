import { call, put } from 'redux-saga/effects';
import { getRoomsSuccess, getRoomsError } from '../Redux/Rooms';

export function* getRooms(api) {
  const accessToken = yield call(api.getAccessToken);

  try {
    const { data } = yield call(api.getRooms, accessToken);
    yield put(getRoomsSuccess(data.items));
  } catch (_err) {
    yield put(getRoomsError('Failed to get rooms'));
  }
}
