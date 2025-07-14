import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TIngredientType } from '@utils/types.ts';

export const getIngredientsByType = (
  ingredients: TIngredientDTO[],
  type: TIngredientType
): TIngredientDTO[] => {
  return ingredients.filter((el) => el.type === type);
};
