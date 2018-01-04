import { call, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import FixtureApi from '../../App/Services/FixtureApi';
import { authenticate, refreshToken } from './CurrentUserSagas';
import { set } from '../Redux/CurrentUser';

const code = '1234567890';
const accessToken = '0987654321';

test('authenticate', () => {
  const saga = authenticate(FixtureApi, { payload: { code } });

  expect(saga.next().value).toEqual(put(set({ data: null, loading: true })));
  expect(saga.next().value).toEqual(call(FixtureApi.authenticate, code));

  expect(saga.next(accessToken).value).toEqual(
    put(
      set({
        loading: false,
        data: {
          accessToken
        }
      })
    )
  );

  expect(saga.next().value).toEqual(
    put(NavigationActions.navigate({ routeName: 'Main' }))
  );
});

test('authenticate failure', () => {
  const saga = authenticate(FixtureApi, { payload: { code } });

  saga.next();
  saga.next();

  expect(saga.throw(new Error('whoops')).value).toEqual(
    put(set({ loading: false, data: null }))
  );
});

test('refreshToken', () => {
  const saga = refreshToken(FixtureApi);

  expect(saga.next().value).toEqual(call(FixtureApi.getAccessToken));

  expect(saga.next(accessToken).value).toEqual(
    put(set({ loading: false, data: { accessToken } }))
  );

  expect(saga.next().value).toEqual(
    put(NavigationActions.navigate({ routeName: 'Main' }))
  );
});
