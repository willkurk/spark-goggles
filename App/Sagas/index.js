import { takeLatest, all, fork } from 'redux-saga/effects';
import Api from '../Services/Api';
import OAuth from '../Services/OAuth';
import FixtureApi from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import * as Login from '../Redux/Login';
import * as Phone from '../Redux/Phone';
import * as Messages from '../Redux/Messages';

/* ------------- Sagas ------------- */

import * as LoginSagas from './LoginSagas';
import * as PhoneSagas from './PhoneSagas';
import * as MessageSagas from './MessageSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureApi : Api.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    /**
     * Login
     */
    takeLatest(Login.AUTHENTICATE, LoginSagas.authenticate, api, OAuth),

    /**
     * Phone
     */
    fork(PhoneSagas.observePhone, api),
    takeLatest(Phone.REQUEST_PERMISSIONS, PhoneSagas.requestPermissions, api),
    takeLatest(Phone.REGISTER_PHONE, PhoneSagas.registerPhone, api),
    takeLatest(Phone.DIAL_PHONE, PhoneSagas.dialPhone, api),
    takeLatest(Phone.HANGUP_PHONE, PhoneSagas.hangupPhone, api),
    takeLatest(Phone.ACCEPT_INCOMING_CALL, PhoneSagas.acceptIncomingCall, api),
    takeLatest(Phone.REJECT_INCOMING_CALL, PhoneSagas.rejectIncomingCall, api),

    /**
     * Messages
     */
    fork(MessageSagas.pollMessages, api),
    takeLatest(Messages.START_POLLING, MessageSagas.startPollingMessages, api),
    takeLatest(Messages.SEND_MESSAGE, MessageSagas.sendMessage, api)
  ]);
}
