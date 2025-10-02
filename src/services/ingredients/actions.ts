import { getIngredientsApi } from '@/api/ingredients.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { EIngredientType } from './../../utils/types';

import type { TIngredientState } from './reducer';
import type { TIngredientsResponse } from '@/api/types';
import type { WritableDraft } from 'immer';

export const incrementCount = (
  state: WritableDraft<TIngredientState>,
  ingredientId: string,
  stepCount = 1
): void => {
  const index = state.ingredients.findIndex((el) => el._id === ingredientId);
  if (index !== -1) {
    const updatedData = state.ingredients[index];
    updatedData.count = (updatedData?.count ?? 0) + stepCount;
    state.ingredients.splice(index, 1, updatedData);
  }
};

export const clearBunCount = (
  state: WritableDraft<TIngredientState>,
  currentBunId: string
): void => {
  state.ingredients
    .filter((el) => el.type === EIngredientType.bun && el._id !== currentBunId)
    .map((el) => {
      el.count = undefined;
      return el;
    });
};

export const clearCounts = (state: WritableDraft<TIngredientState>): void => {
  state.ingredients.map((el) => {
    el.count = undefined;
    return el;
  });
};

export const loadIngredients = createAsyncThunk<TIngredientsResponse, void>(
  'ingredients/loadIngredients',
  getIngredientsApi
);
