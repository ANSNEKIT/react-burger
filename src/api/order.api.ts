import { fetchWithRefresh } from './utils';

import type {
  TCreateOrderData,
  TOrderData,
  TCreateOrderResponseBody,
  TOrderResponseBody,
} from '@/types/transport';

export const createOrder = (
  payload: TCreateOrderData
): Promise<TCreateOrderResponseBody> => {
  return fetchWithRefresh<object, TCreateOrderResponseBody>('post', '/orders', payload);
};

export const getOrder = (payload: TOrderData): Promise<TOrderResponseBody> => {
  return fetchWithRefresh<object, TOrderResponseBody>(
    'get',
    `/orders/${payload.orderId}`
  );
};

export const orderApi = {
  createOrder,
  getOrder,
};
