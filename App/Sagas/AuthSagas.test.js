import { call, put } from 'redux-saga/effects';
import * as AuthSagas from '../../App/Sagas/AuthSagas';
import fixtureAuth from '../../App/Services/FixtureAuth';

test('generateToken', () => {
  const saga = AuthSagas.generateToken(fixtureAuth, 'Rick', 'ricky');

  const data = {
    name: 'Rick',
    sub: 'ricky',
    token: '1234567890'
  };

  expect(saga.next().value).toEqual(
    call(fixtureAuth.generateToken, 'Rick', 'ricky')
  );

  expect(saga.next({ ok: true, data }).value).toEqual(
    put({ type: 'currentUser/SET', user: data })
  );
});
