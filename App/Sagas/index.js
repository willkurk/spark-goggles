import { takeLatest, all, fork } from 'redux-saga/effects';
import Api from '../Services/Api';
import FixtureApi from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import * as CurrentUser from '../Redux/CurrentUser';
import * as Phone from '../Redux/Phone';

/* ------------- Sagas ------------- */

import * as CurrentUserSagas from './CurrentUserSagas';
import * as PhoneSagas from './PhoneSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureApi : Api.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    /**
     * Current user
     */
    takeLatest(CurrentUser.AUTHENTICATE, CurrentUserSagas.authenticate, api),

    /**
     * Phone
     */
    fork(PhoneSagas.observePhone, api),
    takeLatest(Phone.REQUEST_PERMISSIONS, PhoneSagas.requestPermissions, api),
    takeLatest(Phone.REGISTER_PHONE, PhoneSagas.registerPhone, api),
    takeLatest(Phone.DIAL_PHONE, PhoneSagas.dialPhone, api),
    takeLatest(Phone.HANGUP_PHONE, PhoneSagas.hangupPhone, api)
  ]);
}
