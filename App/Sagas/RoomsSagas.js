import { call, put, all } from 'redux-saga/effects';
import { getRoomsSuccess, getRoomsError } from '../Redux/Rooms';

export function* getRooms(api) {
  const accessToken = yield call(api.getAccessToken);

  try {
    const { data: { items: teams } } = yield call(api.getTeams, accessToken);

    const responses = yield all(
      teams.map(team => call(api.getRooms, accessToken, team.id))
    );

    const rooms = Object.values(
      responses.reduce(
        (acc, resp) => ({
          ...acc,
          ...resp.data.items.reduce(
            (rooms, room) => ({
              ...room,
              ...{ [room.id]: room }
            }),
            {}
          )
        }),
        {}
      )
    );

    yield put(getRoomsSuccess(rooms));
  } catch (_err) {
    yield put(getRoomsError('Failed to get rooms.'));
  }
}
