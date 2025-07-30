import { createSlice } from '@reduxjs/toolkit';

import type { TBasket, TOrder } from '@/utils/types';

export type TBasketState = {
  basket: TBasket | null;
  order: TOrder | null;
};

const initialState: TBasketState = {
  basket: null,
  order: null,
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {},
});

export default basketSlice.reducer;
