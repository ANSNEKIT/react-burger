import { createSlice } from '@reduxjs/toolkit';

import { createOrder } from './actions';

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
    moveIngredient(
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) {
      const { dragIndex, hoverIndex } = action.payload;
      if (dragIndex === -1 || hoverIndex === -1) {
        return;
      }
      const ingredients = [...state.ingredients];
      const newItem = ingredients.splice(dragIndex, 1)[0];
      ingredients.splice(hoverIndex, 0, newItem);
      state.ingredients = ingredients;
    },
    clearBasket(state) {
      state.ingredients = [];
      state.bun = null;
      state.order = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state) => {
        state.order = null;
      });
  },
});

export const { setBun, addIngredient, removeIngredient, moveIngredient, clearBasket } =
  basketSlice.actions;

export default basketSlice.reducer;
