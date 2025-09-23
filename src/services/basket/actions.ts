import { createOrderApi, type TOrderPayload, type TOrderData } from '@/api/order.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createOrder = createAsyncThunk<TOrderData, TOrderPayload>(
  'basket/createOrder',
  async (payload: TOrderPayload) => {
    return await createOrderApi(payload);
  }
);
