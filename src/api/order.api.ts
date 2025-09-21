import { getResponse } from './utils';

import type { TOrder } from '@/services/basket/types';

export type TOrderPayload = {
  ingredients: string[];
};

export type TOrderData = {
  name: string;
  order: TOrder;
  success: true;
};

export const createOrderApi = async (payload: TOrderPayload): Promise<TOrderData> => {
  const options: RequestInit = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return fetch('https://norma.nomoreparties.space/api/orders', options)
    .then(getResponse<TOrderData>)
    .catch((err: Error) => {
      throw new Error(`HTTP error! ${err?.message}`);
    });
};
