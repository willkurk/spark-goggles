import { appendMessages, clearMessages } from '../Redux/Messages';
import { call, put, select } from 'redux-saga/effects';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export function* pollMessages(api, { payload }) {
  const response = yield call(api.sendMessage, payload.accessToken, {
    text: 'Hello',
    toPersonEmail: payload.address
  });

  const { roomId } = response.data;

  while (true) {
    const { data: { items: messages } } = yield call(
      api.getMessages,
      payload.accessToken,
      {
        roomId
      }
    );

    const cache = yield select(state => state.messages);

    const cachedIds = cache.map(cacheItem => cacheItem.id);
    const newMessages = messages.filter(
      message =>
        !cachedIds.includes(message.id) && message.files && message.files.length
    );

    if (newMessages.length) {
      yield put(appendMessages({ messages: newMessages }));
    }

    yield call(delay, 7000);
  }

  yield put(clearMessages());
}
