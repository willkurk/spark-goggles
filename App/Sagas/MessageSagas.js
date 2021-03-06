import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { appendMessages, setRoomId } from '../Redux/Messages';

export function* sendMessage(api, { payload }) {
  const accessToken = yield call(api.getAccessToken);
  yield call(api.sendMessage, accessToken, payload);
}

export function* startPollingMessages(api, { payload }) {
  /**
   * At this point, we just have an email address. We need to find the
   * room ID for the 1 on 1 video chat we're in. Easiest way to do that
   * is to send a DM and get the roomId back in the response.
   */
  const accessToken = yield call(api.getAccessToken);

  const { data } = yield call(api.sendMessage, accessToken, {
    text: payload.exploratoryMessage,
    toPersonEmail: payload.address
  });

  yield put(setRoomId(data.roomId));
}

const messageFilter = existing => {
  const ids = existing.map(message => message.id);
  return message => !ids.includes(message.id);
};

export function* pollMessages(api) {
  while (true) {
    const accessToken = yield call(api.getAccessToken);
    const current = yield select(state => state.messages);

    /**
     * If we don't have an access token or the roomId is not set,
     * we'll skip this iteration and move on.
     */
    if (!accessToken || !current.roomId) {
      yield call(delay, 7000);
      continue;
    }

    const { data } = yield call(api.getMessages, accessToken, {
      roomId: current.roomId
    });

    const newMessages = data.items
      .filter(messageFilter(current.data))
      .map(message => ({
        ...message,
        files: (message.files || []).map(file => ({
          uri: file,
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }))
      }));

    if (newMessages.length) {
      yield put(appendMessages({ data: newMessages }));
    }

    yield call(delay, 3000);
  }
}
