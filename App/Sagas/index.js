import { takeLatest, all } from 'redux-saga/effects'
import Api from '../Services/Api'
import FixtureApi from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import * as CurrentUser from '../Redux/CurrentUser';

/* ------------- Sagas ------------- */

import * as CurrentUserSagas from './CurrentUserSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureApi : Api.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(CurrentUser.AUTHENTICATE, CurrentUserSagas.authenticate, api)
  ]);
}
