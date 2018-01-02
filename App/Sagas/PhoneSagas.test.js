import { call, put } from 'redux-saga/effects';
import FixtureApi from '../../App/Services/FixtureApi';
import { registerPhone } from './PhoneSagas';
import { update } from '../Redux/Phone';

test('registerPhone', () => {
  const saga = registerPhone(FixtureApi);

  expect(saga.next().value).toEqual(
    put(update({ registration: { loading: true, complete: false } }))
  );

  expect(saga.next().value).toEqual(
    call(FixtureApi.registerPhone)
  );

  expect(saga.next().value).toEqual(
    put(update({ registration: { loading: false, complete: true } }))
  );
});
