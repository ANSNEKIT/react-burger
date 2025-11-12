import { orderApi } from '@/api/order.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TCreateOrderData, TCreateOrderResponseBody } from '@/types/transport';

export const createOrder = createAsyncThunk<TCreateOrderResponseBody, TCreateOrderData>(
  'basket/createOrder',
  async (payload: TCreateOrderData) => {
    return await orderApi.createOrder(payload);
  }
);
