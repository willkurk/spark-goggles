import { call, put, all } from 'redux-saga/effects';
import { getPeople } from './PeopleSagas';
import { getPeopleSuccess, getPeopleError } from '../Redux/People';
import api from '../Services/FixtureApi';

const accessToken = '1234567890';
const teams = { data: { items: [{ id: 'team-1' }, { id: 'team-2' }] } };
const memberOne = { id: 'member-1' };
const memberTwo = { id: 'member-2' };
const memberThree = { id: 'member-3' };
const teamMembers = [
  { data: { items: [memberOne, memberTwo] } },
  { data: { items: [memberTwo] } },
  { data: { items: [memberThree, memberOne] } }
];

test('getPeople', () => {
  const saga = getPeople(api);

  expect(saga.next().value).toEqual(call(api.getAccessToken));
  expect(saga.next(accessToken).value).toEqual(call(api.getTeams, accessToken));

  expect(saga.next(teams).value).toEqual(
    all(
      teams.data.items.map(team =>
        call(api.getTeamMembers, accessToken, team.id)
      )
    )
  );

  expect(saga.next(teamMembers).value).toEqual(
    put(getPeopleSuccess([memberOne, memberTwo, memberThree]))
  );
});

test('getPeople failure', () => {
  const saga = getPeople(api);
  saga.next();
  saga.next(accessToken);

  expect(saga.throw(new Error('foo')).value).toEqual(
    put(getPeopleError('Failed to get people.'))
  );
});
