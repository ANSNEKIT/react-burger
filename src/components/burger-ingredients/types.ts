import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TIngredientType } from '@/utils/types';

export type TIngredientCategoryType = {
  type: TIngredientType;
  items: TIngredientDTO[];
};
