import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { setRoomId, appendMessages } from '../Redux/Messages';
import { startPollingMessages, pollMessages } from './MessageSagas';
import api from '../Services/FixtureApi';

const roomId = 'abc-def-ghi';
const address = 'user@example.com';
const accessToken = '1234567890';
const testFile = 'testFile.tif';

test('startPollingMessages', () => {
  const saga = startPollingMessages(api, {
    payload: {
      address,
      exploratoryMessage: 'hi'
    }
  });

  expect(saga.next().value).toEqual(call(api.getAccessToken));

  expect(saga.next(accessToken).value).toEqual(
    call(api.sendMessage, accessToken, {
      text: 'hi',
      toPersonEmail: address
    })
  );

  expect(saga.next({ data: { roomId } }).value).toEqual(put(setRoomId(roomId)));
});

describe('pollMessages', () => {
  test('when the roomId is null', () => {
    const saga = pollMessages(api);

    expect(saga.next().value).toEqual(call(api.getAccessToken));

    expect(saga.next(accessToken).value).toMatchObject({
      SELECT: { args: [] }
    });

    expect(saga.next({ roomId: null }).value).toEqual(call(delay, 7000));
    expect(saga.next().value).toEqual(call(api.getAccessToken));
  });

  test('recurring with roomId', () => {
    const one = { id: '1', files: [] };
    const two = { id: '2', files: [testFile] };
    const three = { id: '3', files: [] };

    const postTwo = {
      ...two,
      files: [
        {
          uri: testFile,
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      ]
    };

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

    const saga = pollMessages(api);

    expect(saga.next().value).toEqual(call(api.getAccessToken));

    expect(saga.next(accessToken).value).toMatchObject({
      SELECT: { args: [] }
    });

    expect(saga.next(current).value).toEqual(
      call(api.getMessages, accessToken, { roomId })
    );

    expect(saga.next(response).value).toEqual(
      put(appendMessages({ data: [postTwo, three] }))
    );

    expect(saga.next().value).toEqual(call(delay, 3000));
    expect(saga.next().value).toEqual(call(api.getAccessToken));
  });
});
