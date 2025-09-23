import { getResponse } from './utils';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TFetchResponse } from '@/utils/types';

export const getIngredients = async (): Promise<TFetchResponse<TIngredientDTO[]>> => {
  return fetch('https://norma.nomoreparties.space/api/ingredients')
    .then(getResponse<TFetchResponse<TIngredientDTO[]>>)
    .catch((err: Error) => {
      throw new Error(`HTTP error! ${err?.message}`);
    });
};
