import { customFetch } from './utils';

import type {
  TCreateOrderData,
  TFetchError,
  TIngredientsResponseBody,
} from '@/types/transport';

export const getIngredientsApi = (): Promise<TIngredientsResponseBody> => {
  try {
    return customFetch<TCreateOrderData, TIngredientsResponseBody>(
      'get',
      '/ingredients'
    );
  } catch (error: unknown) {
    const errorMessage = (error as TFetchError)?.message || 'Failed to load ingredients';
    throw new Error(errorMessage);
  }
};
