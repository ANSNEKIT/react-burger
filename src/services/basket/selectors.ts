import { createSelector } from 'reselect';

import { getIngredients } from '../ingredients/selectors';

import type { RootState } from '../store';
import type { TOrder } from './types';
import type { TIngredientDTO } from '@/contracts/ingredientDTO';

export const getOrder = (store: RootState): TOrder | null => store.basketSlice.order;
export const getBasket = (store: RootState): TIngredientDTO[] =>
  store.basketSlice.ingredients;

// TODO исправить
// export const getBasketIngredients = createSelector(
//   [
//     (store: RootState): TIngredientDTO[] => getIngredients(store),
//     (store: RootState): TIngredientDTO[] => getBasket(store),
//   ],
//   (ingredients, basketIngredients) => {
//     const ids = basketIngredients.map((el) => el._id);
//     return ingredients.filter((el) => ids.includes(el._id));
//   }
// );

export const getOrderTotalPrice = createSelector(
  (store: RootState): TIngredientDTO[] => getIngredients(store),
  (ingredients) => ingredients.reduce((acc, el) => (acc += el.price), 0)
);
