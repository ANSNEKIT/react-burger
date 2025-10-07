import type { RootState } from '../store';
import type { TIngredientDTO } from '@/contracts/ingredientDTO';

export const getOrder = (store: RootState): { number: number } | null =>
  store.basketSlice.order;
export const getBasketIngredients = (store: RootState): TIngredientDTO[] =>
  store.basketSlice.ingredients;
export const getBasketBun = (store: RootState): TIngredientDTO | null =>
  store.basketSlice.bun;
export const getIsLoadingOrder = (store: RootState): boolean =>
  store.basketSlice.isLoading;
