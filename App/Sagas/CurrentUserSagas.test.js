import { call, put } from 'redux-saga/effects';
import * as CurrentUserSagas from '../../App/Sagas/CurrentUserSagas';
import fixtureAuth from '../../App/Services/FixtureAuth';

test('generateToken', () => {
  const saga = CurrentUserSagas.generateToken(fixtureAuth, {
    name: 'Rick',
    sub: 'ricky'
  });

  const data = {
    name: 'Rick',
    sub: 'ricky',
    token: '1234567890'
  };

  expect(saga.next().value).toEqual(
    put({ type: 'currentUser/SET', data: null, loading: true })
  );

  expect(saga.next().value).toEqual(
    call(fixtureAuth.generateToken, 'Rick', 'ricky')
  );

  expect(saga.next({ ok: true, data }).value).toEqual(
    put({ type: 'currentUser/SET', data, loading: false })
  );
});
