import { fetchWithRefresh } from './utils';

import type { TCreateOrderData, TOrderResponseBody } from '@/types/transport';

export const createOrderApi = (
  payload: TCreateOrderData
): Promise<TOrderResponseBody> => {
  return fetchWithRefresh<object, TOrderResponseBody>('post', '/orders', payload);
};
