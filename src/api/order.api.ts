import { fetchWithRefresh } from './utils';

import type { TOrderData, TOrderResponse } from './types';

export const createOrderApi = (payload: TOrderData): Promise<TOrderResponse> => {
  return fetchWithRefresh<object, TOrderResponse>('post', '/orders', payload);
};
