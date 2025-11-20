import { EIngredientType } from '@/types/enums';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { loadIngredients } from './actions';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TIngredientType } from '@/types/types';

export type TIngredientState = {
  ingredients: TIngredientDTO[];
  mapIngredients: [string, TIngredientDTO][];
  activeCategory: TIngredientType;
  currentIngredient: TIngredientDTO | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientState = {
  ingredients: [],
  mapIngredients: [],
  currentIngredient: null,
  activeCategory: 'main',
  isLoading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setActiveCatigory(state, action: PayloadAction<TIngredientType>) {
      state.activeCategory = action.payload;
    },
    setCurrentIngredient(state, action: PayloadAction<string>) {
      const ingredient = state.ingredients.find((el) => el._id === action.payload);
      if (ingredient) {
        state.currentIngredient = ingredient;
      }
    },
    incrementCount(
      state,
      action: PayloadAction<{ ingredientId: string; stepCount?: number }>
    ) {
      const { ingredientId, stepCount = 1 } = action.payload;
      const index = state.ingredients.findIndex((el) => el._id === ingredientId);
      if (index !== -1) {
        const updatedData = state.ingredients[index];
        updatedData.count = (updatedData?.count ?? 0) + stepCount;
        state.ingredients.splice(index, 1, updatedData);
      }
    },
    decrementCount(state, action: PayloadAction<string>) {
      const index = state.ingredients.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        const updatedData = state.ingredients[index];
        const hasCount = updatedData?.count && updatedData.count !== 0;
        updatedData.count = hasCount ? updatedData.count! - 1 : undefined;
        state.ingredients.splice(index, 1, updatedData);
      }
    },
    clearBunCount(state, action: PayloadAction<string>) {
      state.ingredients
        .filter((el) => el.type === EIngredientType.bun && el._id !== action.payload)
        .map((el) => {
          el.count = undefined;
          return el;
        });
    },
    clearCounts(state) {
      state.ingredients.map((el) => {
        el.count = undefined;
        return el;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.error = action?.error?.message ?? 'Unknown error';
        state.isLoading = false;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload.data;
        state.mapIngredients = state.ingredients.map((ing) => [ing._id, ing]);
      });
  },
});

export const {
  setActiveCatigory,
  setCurrentIngredient,
  incrementCount,
  decrementCount,
  clearBunCount,
  clearCounts,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
