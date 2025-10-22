import { createOrderApi } from '@/api/order.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TCreateOrderData, TOrderResponseBody } from '@/types/transport';

export const createOrder = createAsyncThunk<TOrderResponseBody, TCreateOrderData>(
  'basket/createOrder',
  async (payload: TCreateOrderData) => {
    return await createOrderApi(payload);
  }
);
