import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TFetchResponse } from '@/utils/types';

export const getIngredients = async (): Promise<TIngredientDTO[]> => {
  try {
    const response = await fetch('https://norma.nomoreparties.space/api/ingredients');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as TFetchResponse<TIngredientDTO[]>;

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
