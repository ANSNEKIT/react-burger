import {
  loadFeed,
  onClose,
  onConnecting,
  onError,
  onMessage,
  onOpen,
} from '@/services/feed/actions';
import { feedSlice, feedState, setCurrentFeed } from '@/services/feed/reducer';
import { EWebsocketStatus } from '@/types/enums';

import data from '../mocks';

describe('feed reducer', () => {
  test('should return correct state', () => {
    const newState = feedSlice.reducer(undefined, { type: '' });

    expect(newState).toEqual(feedState);
  });

  test('should action setCurrentFeed set feed', () => {
    const initState = {
      ...feedState,
      feeds: [data.order],
    };
    const orderNumber = data.order.number.toString();
    const setCurrentFeedAction = setCurrentFeed(orderNumber);
    const newState = feedSlice.reducer(initState, setCurrentFeedAction);

    expect(newState).toEqual({
      ...feedState,
      feeds: [data.order],
      currentFeed: data.order,
    });
  });
});

describe('feed async actions', () => {
  test('should onConnecting set status to CONNECTING', () => {
    const newState = feedSlice.reducer(undefined, onConnecting());

    expect(newState).toEqual({ ...feedState, status: EWebsocketStatus.CONNECTING });
  });

  test('should onOpen set status to ONLINE', () => {
    const newState = feedSlice.reducer(undefined, onOpen());

    expect(newState).toEqual({ ...feedState, status: EWebsocketStatus.ONLINE });
  });

  test('should onError set error', () => {
    const newState = feedSlice.reducer(undefined, onError('Test error'));

    expect(newState).toEqual({
      ...feedState,
      error: 'Test error',
    });
  });

  test('should onClose set status OFFLINE', () => {
    const initState = {
      ...feedState,
      status: EWebsocketStatus.ONLINE,
      currentFeed: data.order,
    };
    const newState = feedSlice.reducer(initState, onClose());

    expect(newState).toEqual({
      ...feedState,
      status: EWebsocketStatus.OFFLINE,
      currentFeed: null,
    });
  });

  test('should onMessage set status OFFLINE', () => {
    const mockResponseData = {
      success: true,
      orders: [data.order],
      total: 1,
      totalToday: 1,
    };
    const newState = feedSlice.reducer(undefined, onMessage(mockResponseData));

    expect(newState).toEqual({ ...feedState, feeds: [data.order] });
  });

  test('should loadFeed fulfilled and set currentFeed', () => {
    const initState = {
      ...feedState,
      isLoading: true,
      currentFeed: { ...data.order, _id: '111' },
    };
    const newState = feedSlice.reducer(initState, {
      type: loadFeed.fulfilled.type,
      payload: { orders: [data.order] },
    });

    expect(newState).toEqual({
      ...feedState,
      isLoading: false,
      currentFeed: data.order,
    });
  });

  test('should loadFeed rejected and clear currentFeed', () => {
    const initState = {
      ...feedState,
      isLoading: true,
      currentFeed: data.order,
    };
    const newState = feedSlice.reducer(initState, {
      type: loadFeed.rejected.type,
      payload: { orders: [data.order] },
    });

    expect(newState).toEqual({ ...feedState, isLoading: false, currentFeed: null });
  });
});
