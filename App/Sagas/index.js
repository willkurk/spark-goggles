import { takeLatest, all } from 'redux-saga/effects'
import Auth from '../Services/Auth'
import FixtureAuth from '../Services/FixtureAuth'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import * as CurrentUser from '../Redux/CurrentUser';

/* ------------- Sagas ------------- */

import * as CurrentUserSagas from './CurrentUserSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const auth = DebugConfig.useFixtures ? FixtureAuth : Auth.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(CurrentUser.GENERATE_TOKEN, CurrentUserSagas.generateToken, auth)
  ]);
}
