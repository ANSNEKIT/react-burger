import { EIngredientType } from '@/types/enums';
import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { TIngredientState } from './reducer';
import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TIngredientCategoryType, TIngredientType } from '@/types/types';

export const getIngredients = (store: RootState): TIngredientDTO[] =>
  store.ingredientsSlice.ingredients;

export const getMapIngredints = (store: RootState): [string, TIngredientDTO][] =>
  store.ingredientsSlice.mapIngredients;

export const getIngredientsState = (store: RootState): TIngredientState =>
  store.ingredientsSlice;

export const getActiveCategory = (store: RootState): TIngredientType =>
  store.ingredientsSlice.activeCategory;

const getIngredientsByType = (
  type: TIngredientType,
  ingredients: TIngredientDTO[]
): TIngredientDTO[] => ingredients.filter((el) => el.type === type);

export const getBurgerIngredients = createSelector(
  (store: RootState): TIngredientDTO[] => getIngredients(store),
  (allIngredients: TIngredientDTO[]): TIngredientCategoryType[] => {
    const ingredintsByCategory = [
      EIngredientType.bun,
      EIngredientType.main,
      EIngredientType.sauce,
    ].map((type) => ({
      type,
      items: getIngredientsByType(type, allIngredients),
    }));

    return ingredintsByCategory;
  }
);

export const getCurrentIngredient = (store: RootState): TIngredientDTO | null =>
  store.ingredientsSlice.currentIngredient;
