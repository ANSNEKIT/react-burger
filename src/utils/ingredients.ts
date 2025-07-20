import {
  EIngredientType,
  type TIngredientType,
  type TIngredientCategoryType,
} from '@utils/types.ts';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';

const getIngredientsByType = (
  ingredients: TIngredientDTO[],
  type: TIngredientType
): TIngredientDTO[] => {
  return ingredients.filter((el) => el.type === type);
};

export const getBurgerIngredients = (
  ingredients: TIngredientDTO[]
): TIngredientCategoryType[] => {
  const ingredintsByCategory = [
    EIngredientType.bun,
    EIngredientType.main,
    EIngredientType.sauce,
  ].map((type) => ({
    type,
    items: getIngredientsByType(ingredients, type),
  }));

  return ingredintsByCategory;
};
