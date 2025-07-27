import { createSlice } from '@reduxjs/toolkit';

import { loadIngredients } from './actions';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';

type TIngredientState = {
  ingredients: TIngredientDTO[];
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.error = action?.error?.message ?? 'Unknown error';
        state.loading = false;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  },
});

export const { getIngredients } = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
