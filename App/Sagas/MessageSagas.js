import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { appendMessages, setRoomId } from '../Redux/Messages';
import { getAccessToken } from '../Redux/CurrentUser';

export function* startPollingMessages(api, { payload }) {
  /**
   * At this point, we just have an email address. We need to find the
   * room ID for the 1 on 1 video chat we're in. Easiest way to do that
   * is to send a DM and get the roomId back in the response.
   */
  const accessToken = yield select(getAccessToken);

  const { data } = yield call(api.sendMessage, accessToken, {
    text: 'Hello',
    toPersonEmail: payload.address
  });

  yield put(setRoomId(data.roomId));
}

const messageFilter = existing => {
  const ids = existing.map(message => message.id);

  return message => {
    // Skip messages that don't have files
    if (!message.files && !message.files.length) {
      return false;
    }

    // Skip messages that are already in state.
    if (ids.includes(message.id)) {
      return false;
    }

    return true;
  };
};

export function* pollMessages(api) {
  while (true) {
    const current = yield select(state => ({
      ...state.messages,
      accessToken: getAccessToken(state)
    }));

    if (!current.roomId) {
      // If the roomId isn't set, then we'll skip this iteration.
      yield call(delay, 7000);
      continue;
    }

    const { data } = yield call(api.getMessages, current.accessToken, {
      roomId: current.roomId
    });

    const newMessages = data.items.filter(messageFilter(current.data));

    if (newMessages.length) {
      yield put(appendMessages({ data: newMessages }));
    }

    yield call(delay, 7000);
  }
}
