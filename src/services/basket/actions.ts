import { createOrderApi } from '@/api/order.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TOrderData, TOrderResponse } from '@/api/types';

export const createOrder = createAsyncThunk<TOrderResponse, TOrderData>(
  'basket/createOrder',
  async (payload: TOrderData) => {
    return await createOrderApi(payload);
  }
);
