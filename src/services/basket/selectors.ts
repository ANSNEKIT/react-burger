import type { RootState } from '../store';
import type { TOrder } from './types';
import type { TIngredientDTO } from '@/contracts/ingredientDTO';

export const getOrder = (store: RootState): TOrder | null => store.basketSlice.order;
export const getBasketIngredients = (store: RootState): TIngredientDTO[] =>
  store.basketSlice.ingredients;
export const getBasketBun = (store: RootState): TIngredientDTO | null =>
  store.basketSlice.bun;

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
