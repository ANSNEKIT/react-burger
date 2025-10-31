import { customFetch } from './utils';

import type { TCreateOrderData, TIngredientsResponseBody } from '@/types/transport';

export const getIngredientsApi = (): Promise<TIngredientsResponseBody> => {
  return customFetch<TCreateOrderData, TIngredientsResponseBody>('get', '/ingredients');
};
