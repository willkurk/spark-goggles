import { call, put, race } from 'redux-saga/effects';
import { getPeopleSuccess, getPeopleError } from '../Redux/People';

export function* getPeople(api) {
  const accessToken = yield call(api.getAccessToken);

  try {
    const { data: { items: teams } } = yield call(api.getTeams, accessToken);

    const responses = yield race(
      teams.map(team => call(api.getTeamMembers, accessToken, team.id))
    );

    const people = responses.reduce(
      (acc, resp) => acc.concat(resp.data.items),
      []
    );

    yield put(getPeopleSuccess(people));
  } catch (_err) {
    yield put(getPeopleError('Failed to get people.'));
  }
}
