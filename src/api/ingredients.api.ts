import { customFetch } from './utils';

import type { TIngredientsResponse } from './types';

export const getIngredientsApi = (): Promise<TIngredientsResponse> => {
  return customFetch<object, TIngredientsResponse>('get', '/ingredients');
};
