import { createSlice } from '@reduxjs/toolkit';

import type { TOrder } from './types';
import type { TIngredientDTO } from '@/contracts/ingredientDTO';

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
  reducers: {},
});

export default basketSlice.reducer;
