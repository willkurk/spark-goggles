import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { getAccessToken } from '../Redux/CurrentUser';
import { setRoomId, appendMessages } from '../Redux/Messages';
import { startPollingMessages, pollMessages } from './MessageSagas';
import FixtureApi from '../Services/FixtureApi';

const roomId = 'abc-def-ghi';
const address = 'user@example.com';
const accessToken = '1234567890';

test('startPollingMessages', () => {
  const saga = startPollingMessages(FixtureApi, {
    payload: { address }
  });

  expect(saga.next().value).toEqual(select(getAccessToken));

  expect(saga.next(accessToken).value).toEqual(
    call(FixtureApi.sendMessage, accessToken, {
      text: 'Hello',
      toPersonEmail: address
    })
  );

  expect(saga.next({ data: { roomId } }).value).toEqual(put(setRoomId(roomId)));
});

describe('pollMessages', () => {
  test('when the roomId is null', () => {
    const saga = pollMessages(FixtureApi);

    expect(saga.next().value).toMatchObject({
      SELECT: { args: [] }
    });

    expect(saga.next({ roomId: null }).value).toEqual(call(delay, 7000));

    expect(saga.next().value).toMatchObject({
      SELECT: { args: [] }
    });
  });

  test('recurring with roomId', () => {
    const one = { id: '1', files: ['foo'] };
    const two = { id: '2', files: [] };
    const three = { id: '3', files: ['bar'] };

    const current = {
      roomId,
      accessToken,
      data: [one]
    };

    const response = {
      data: {
        items: [one, two, three]
      }
    };

    const saga = pollMessages(FixtureApi);

    expect(saga.next().value).toMatchObject({
      SELECT: { args: [] }
    });

    expect(saga.next(current).value).toEqual(
      call(FixtureApi.getMessages, accessToken, { roomId })
    );

    expect(saga.next(response).value).toEqual(
      put(appendMessages({ data: [three] }))
    );

    expect(saga.next().value).toEqual(call(delay, 7000));

    expect(saga.next().value).toMatchObject({
      SELECT: { args: [] }
    });
  });
});
