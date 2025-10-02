import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { addIngredient, clearBasket, removeIngredient, setBun } from '../basket/reducer';
import { clearBunCount, clearCounts, incrementCount, loadIngredients } from './actions';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TIngredientType } from '@/utils/types';

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
    setCurrentIngredient(state, action: PayloadAction<string>) {
      const ingredient = state.ingredients.find((el) => el._id === action.payload);
      if (ingredient) {
        state.currentIngredient = ingredient;
      }
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
      })
      .addCase(addIngredient, (state, action) => {
        incrementCount(state, action.payload._id);
      })
      .addCase(setBun, (state, action) => {
        const stepCount = 2;
        clearBunCount(state, action.payload._id);
        incrementCount(state, action.payload._id, stepCount);
      })
      .addCase(removeIngredient, (state, action) => {
        const index = state.ingredients.findIndex((el) => el._id === action.payload);
        if (index !== -1) {
          const updatedData = state.ingredients[index];
          updatedData.count =
            updatedData?.count && updatedData.count !== 0
              ? updatedData.count - 1
              : undefined;
          state.ingredients.splice(index, 1, updatedData);
        }
      })
      .addCase(clearBasket, (state) => {
        clearCounts(state);
      });
  },
});

export const { setActiveCatigory, setCurrentIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
