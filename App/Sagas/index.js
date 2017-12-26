import { takeLatest, all } from 'redux-saga/effects'
import Auth from '../Services/Auth'
import FixtureAuth from '../Services/FixtureAuth'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

/* ------------- Sagas ------------- */

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAuth : Auth.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([])
}
