import { call, put, all } from 'redux-saga/effects';
import { getPeopleSuccess, getPeopleError } from '../Redux/People';

export function* getPeople(api) {
  const accessToken = yield call(api.getAccessToken);

  try {
    const { data: { items: teams } } = yield call(api.getTeams, accessToken);

    const responses = yield all(
      teams.map(team => call(api.getTeamMembers, accessToken, team.id))
    );

    const people = Object.values(
      responses.reduce(
        (acc, resp) => ({
          ...acc,
          ...resp.data.items.reduce(
            (people, person) => ({
              ...people,
              ...{ [person.personId]: person }
            }),
            {}
          )
        }),
        {}
      )
    );

    yield put(getPeopleSuccess(people));
  } catch (_err) {
    yield put(getPeopleError('Failed to get people.'));
  }
}
