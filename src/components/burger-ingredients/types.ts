import type { TIngredient, TIngredientType } from '@/utils/types';

export type TIngredientCategoryType = {
  type: TIngredientType;
  items: TIngredient[];
};
