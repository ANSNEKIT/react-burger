import { customFetch } from './utils';

import type { TOrderData, TOrderResponse } from './types';

export const createOrderApi = (payload: TOrderData): Promise<TOrderResponse> => {
  return customFetch<object, TOrderResponse>('get', '/orders', payload);
};
