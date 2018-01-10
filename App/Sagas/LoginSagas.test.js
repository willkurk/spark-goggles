import { call, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import api from '../Services/FixtureApi';
import { authenticate } from './LoginSagas';
import { grantAccess, revokeAccess } from '../Redux/Login';

const code = '1234567890';
const accessToken = '0987654321';

const oauth = {
  callback: () => Promise.resolve(code)
};

describe('authenticate', () => {
  let saga;

  beforeEach(() => {
    saga = authenticate(api, oauth);
  });

  test('when already authenticated', () => {
    expect(saga.next().value).toEqual(call(api.getAccessToken));
    expect(saga.next(accessToken).value).toEqual(put(grantAccess()));
    expect(saga.next().value).toEqual(
      put(NavigationActions.navigate({ routeName: 'Main' }))
    );
  });

  describe('oauth', () => {
    beforeEach(() => {
      expect(saga.next().value).toEqual(call(api.getAccessToken));
      expect(saga.next(null).value).toEqual(call(oauth.callback));
    });

    test('when successful', () => {
      expect(saga.next(code).value).toEqual(call(api.authenticate, code));
      expect(saga.next().value).toEqual(put(grantAccess()));
      expect(saga.next().value).toEqual(
        put(NavigationActions.navigate({ routeName: 'Main' }))
      );
    });

    test('when redirect contains an error param', () => {
      const error = new Error('Bad things happened.');
      expect(saga.throw(error).value).toEqual(put(revokeAccess(error.message)));
    });

    test('when code is invalid', () => {
      const error = new Error('Invalid code');
      expect(saga.next(code).value).toEqual(call(api.authenticate, code));
      expect(saga.throw(error).value).toEqual(put(revokeAccess(error.message)));
    });

    test('when code is not present', () => {
      expect(saga.next(undefined).done).toBeTruthy();
    });
  });
});
