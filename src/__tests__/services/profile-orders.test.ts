import {
  loadOrder,
  onClose,
  onConnecting,
  onError,
  onMessage,
  onOpen,
} from '@/services/profile-orders/actions';
import {
  profileOrdersSlice,
  profileOrdersState,
  setCurrentOrder,
} from '@/services/profile-orders/reducer';
import { EWebsocketStatus } from '@/types/enums';

import data from '../mocks';

describe('profile-order reducer', () => {
  test('should return correct state', () => {
    const newState = profileOrdersSlice.reducer(undefined, { type: '' });

    expect(newState).toEqual(profileOrdersState);
  });

  test('should action setCurrentOrder correct', () => {
    const initState = {
      ...profileOrdersState,
      orders: [data.order],
    };
    const orderNumber = data.order.number.toString();
    const setCurrentOrderAction = setCurrentOrder(orderNumber);
    const newState = profileOrdersSlice.reducer(initState, setCurrentOrderAction);

    expect(newState).toEqual({
      ...profileOrdersState,
      orders: [data.order],
      currentOrder: data.order,
    });
  });
});

describe('profile-orders async actions', () => {
  test('should onConnecting set status to CONNECTING', () => {
    const newState = profileOrdersSlice.reducer(undefined, onConnecting());

    expect(newState).toEqual({
      ...profileOrdersState,
      status: EWebsocketStatus.CONNECTING,
    });
  });

  test('should onOpen set status to ONLINE', () => {
    const newState = profileOrdersSlice.reducer(undefined, onOpen());

    expect(newState).toEqual({ ...profileOrdersState, status: EWebsocketStatus.ONLINE });
  });

  test('should onError set error', () => {
    const newState = profileOrdersSlice.reducer(undefined, onError('Test error'));

    expect(newState).toEqual({
      ...profileOrdersState,
      error: 'Test error',
    });
  });

  test('should onClose set status OFFLINE', () => {
    const initState = {
      ...profileOrdersState,
      status: EWebsocketStatus.ONLINE,
      currentOrder: data.order,
    };
    const newState = profileOrdersSlice.reducer(initState, onClose());

    expect(newState).toEqual({
      ...profileOrdersState,
      status: EWebsocketStatus.OFFLINE,
      currentOrder: null,
    });
  });

  test('should onMessage set status OFFLINE', () => {
    const mockResponseData = {
      success: true,
      orders: [data.order],
      total: 1,
      totalToday: 1,
    };
    const newState = profileOrdersSlice.reducer(undefined, onMessage(mockResponseData));

    expect(newState).toEqual({ ...profileOrdersState, orders: [data.order] });
  });

  test('should loadOrder fulfilled and set currentOrder', () => {
    const initState = {
      ...profileOrdersState,
      isLoading: true,
      currentOrder: { ...data.order, _id: '111' },
    };
    const newState = profileOrdersSlice.reducer(initState, {
      type: loadOrder.fulfilled.type,
      payload: { orders: [data.order] },
    });

    expect(newState).toEqual({
      ...profileOrdersState,
      isLoading: false,
      currentOrder: data.order,
    });
  });

  test('should loadOrder rejected and clear currentOrder', () => {
    const initState = {
      ...profileOrdersState,
      isLoading: true,
      currentOrder: data.order,
    };
    const newState = profileOrdersSlice.reducer(initState, {
      type: loadOrder.rejected.type,
      payload: { orders: [data.order] },
    });

    expect(newState).toEqual({
      ...profileOrdersState,
      isLoading: false,
      currentOrder: null,
    });
  });
});
