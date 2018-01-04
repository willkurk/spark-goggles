import { call, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { grantAccess, revokeAccess } from '../Redux/CurrentUser';

export function* authenticate(api, oauth) {
  try {
    /**
     * First, we'll check if the user's access token is already set in the
     * SDK. The SDK will handle refreshes too, which is handy.
     */
    yield call(api.getAccessToken);
    yield put(grantAccess());
    yield put(NavigationActions.navigate({ routeName: 'Main' }));
  } catch (_error) {
    /**
     * Okay, so the user isn't already authenticated. Now, we'll check if
     * Spark redirected back to our app with an authorization code. If
     * we have an authorization code, we can use it to get an access token.
     */
    const code = yield call(oauth.callback);

    if (!code) {
      return;
    }

    try {
      yield call(api.authenticate, code);
      yield put(grantAccess());
      yield put(NavigationActions.navigate({ routeName: 'Main' }));
    } catch (error) {
      yield put(revokeAccess(error));
    }
  }
}
