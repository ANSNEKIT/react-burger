import type { TIngredientType } from '@/utils/types';

export type TIngredientDTO = {
  id?: string;
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
} & { count?: number };
