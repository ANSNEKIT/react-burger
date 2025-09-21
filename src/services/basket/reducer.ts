import { createSlice } from '@reduxjs/toolkit';

import type { TOrder } from './types';
import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TBasketState = {
  bun: TIngredientDTO | null;
  ingredients: TIngredientDTO[];
  order: TOrder | null;
};

const initialState: TBasketState = {
  bun: null,
  ingredients: [],
  order: null,
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredientDTO>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TIngredientDTO>) {
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      const index = state.ingredients.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
  },
});

export const { setBun, addIngredient, removeIngredient } = basketSlice.actions;

export default basketSlice.reducer;
