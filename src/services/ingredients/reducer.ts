import { createSlice } from '@reduxjs/toolkit';

import { loadIngredients } from './actions';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TIngredientType } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TIngredientState = {
  ingredients: TIngredientDTO[];
  activeCategory: TIngredientType;
  currentIngredient: TIngredientDTO | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientState = {
  ingredients: [],
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
    setCurrentIngredient(state, action: PayloadAction<TIngredientDTO | null>) {
      state.currentIngredient = action.payload;
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
      });
  },
});

export const { setActiveCatigory, setCurrentIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
