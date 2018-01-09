import {
  setRoomId,
  appendMessages,
  reducer,
  SET_ROOM_ID,
  APPEND
} from './Messages';

test('setRoomId', () => {
  expect(setRoomId('abc')).toEqual({
    type: SET_ROOM_ID,
    payload: { roomId: 'abc' }
  });
});

test('appendMessages', () => {
  const data = [{ id: 'abc' }];

  expect(appendMessages({ data })).toEqual({
    type: APPEND,
    payload: { data }
  });
});

describe('reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      roomId: null,
      data: []
    });
  });

  test('setRoomId', () => {
    const state = {
      roomId: 'def',
      data: [{ id: '123' }]
    };

    expect(reducer(state, setRoomId('abc'))).toEqual({
      roomId: 'abc',
      data: []
    });
  });

  test('appendMessages', () => {
    const state = {
      roomId: 'abc',
      data: [{ id: '123' }]
    };

    expect(
      reducer(
        state,
        appendMessages({
          data: [{ id: '456' }]
        })
      )
    ).toEqual({
      roomId: 'abc',
      data: [{ id: '123' }, { id: '456' }]
    });
  });
});
