import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TFetchResponse } from '@/utils/types';

const getResponse = <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
};

export const getIngredients = async (): Promise<TFetchResponse<TIngredientDTO[]>> => {
  return fetch('https://norma.nomoreparties.space/api/ingredients').then(
    getResponse<TFetchResponse<TIngredientDTO[]>>
  );
};
