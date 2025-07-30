import { createSelector } from 'reselect';

import { getIngredients } from '../ingredients/selectors';

import type { RootState } from '../store';
import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TBasket, TOrder } from '@/utils/types';

export const getOrder = (store: RootState): TOrder | null => store.basketSlice.order;
export const getBasket = (store: RootState): TBasket | null => store.basketSlice.basket;

export const getBasketIngredients = createSelector(
  [
    (store: RootState): TIngredientDTO[] => getIngredients(store),
    (store: RootState): TBasket | null => getBasket(store),
  ],
  (ingredients, basket) => {
    const ids = basket?.basketIngredientIds ?? [];
    return ingredients.filter((el) => ids.includes(el._id));
  }
);

export const getOrderTotalPrice = createSelector(
  (store: RootState): TIngredientDTO[] => getIngredients(store),
  (ingredients) => ingredients.reduce((acc, el) => (acc += el.price), 0)
);
