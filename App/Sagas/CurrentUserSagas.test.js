import { call, put } from 'redux-saga/effects';
import FixtureApi from '../../App/Services/FixtureApi';
import { authenticate } from './CurrentUserSagas';
import { set } from '../Redux/CurrentUser';

const name = 'Rick';
const sub = 'ricky';
const guestToken = '1234567890';
const accessToken = '0987654321';

test('authenticate', () => {
  const saga = authenticate(FixtureApi, { payload: { name, sub } });

  expect(saga.next().value).toEqual(
    put(set({ data: null, loading: true }))
  );

  expect(saga.next().value).toEqual(
    call(FixtureApi.generateGuestToken, { name, sub })
  );

  expect(saga.next(guestToken).value).toEqual(
    call(FixtureApi.exchangeGuestToken, '1234567890')
  );

  expect(saga.next(accessToken).value).toEqual(
    put(set({
      loading: false,
      data: {
        name,
        sub,
        accessToken
      }
    }))
  );
});
