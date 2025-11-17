import { orderApi } from '@/api/order.api';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { TAllOrders } from '@/contracts/orderDTO';
import type { TOrderData, TOrderResponseBody } from '@/types/transport';

export const connect = createAction<string, 'profile-order/connect'>(
  'profile-order/connect'
);
export const disconnect = createAction('profile-order/disconnect');

export const onConnecting = createAction('profile-order/onconnecting');
export const onOpen = createAction('profile-order/onopen');
export const onMessage = createAction<TAllOrders, 'profile-order/onmessage'>(
  'profile-order/onmessage'
);
export const onError = createAction<string, 'profile-order/onerror'>(
  'profile-order/onerror'
);
export const onClose = createAction('profile-order/onclose');

export const loadOrder = createAsyncThunk<TOrderResponseBody, TOrderData>(
  'profile-order/getOrder',
  async (payload: TOrderData) => {
    return await orderApi.getOrder(payload);
  }
);
