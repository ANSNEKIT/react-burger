import { createOrder } from '@/services/basket/actions';
import {
  basketState,
  basketSlice,
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearBasket,
} from '@/services/basket/reducer';
import { cleanup } from '@testing-library/react';

import data from '../mocks';

describe('basket reducers', () => {
  afterEach(() => {
    cleanup();
  });

  test('should return correct state', () => {
    const newState = basketSlice.reducer(undefined, { type: '' });

    expect(newState).toEqual(basketState);
  });

  test('should return correct action setBun', () => {
    const expectedState = {
      ...basketState,
      bun: data.ingredientBun,
    };

    const newState = basketSlice.reducer(undefined, setBun(data.ingredientBun));

    expect(newState).toEqual(expectedState);
  });

  test('should return correct action addIngredient', () => {
    const expectedState = {
      ...basketState,
      ingredients: [data.ingredientMain],
    };

    const newState = basketSlice.reducer(undefined, addIngredient(data.ingredientMain));

    expect(newState).toEqual(expectedState);
  });

  test('should return correct action removeIngredient', () => {
    const state = {
      ...basketState,
      ingredients: [data.ingredientMain],
    };

    const expectedState = {
      ...basketState,
      ingredients: [],
    };

    const newState = basketSlice.reducer(
      state,
      removeIngredient(data.ingredientMain._id)
    );

    expect(newState).toEqual(expectedState);
  });

  test('should return correct action clearBasket', () => {
    const state = {
      ...basketState,
      bun: data.ingredientBun,
      ingredients: [data.ingredientMain],
      order: data.order,
    };

    const newState = basketSlice.reducer(state, clearBasket());

    expect(newState).toStrictEqual(basketState);
  });

  test('should move dragIndex: 1 to hoverIndex: 3', () => {
    const state = {
      ...basketState,
      ingredients: [...data.ingredients],
    };

    // Перемещаем элемент с индекса 1 на индекс 3
    const newState = basketSlice.reducer(
      state,
      moveIngredient({ dragIndex: 1, hoverIndex: 3 })
    );

    // startIds:        [bun1, main1, 3, 4,     5]
    // expectedIngIds:  [bun1, 3,     4, main1, 5]
    const newIngIds = newState.ingredients.map((ing) => ing._id);
    const expectedIngIds = ['bun1', '3', '4', 'main1', '5'];

    // Проверяем новый порядок
    expect(newState.ingredients).toHaveLength(5);
    expect(newIngIds).toStrictEqual(expectedIngIds);
  });
});

describe('basket async actions', () => {
  afterEach(() => {
    cleanup();
  });

  test('should createOrder fullfilled', () => {
    const initState = {
      ...basketState,
      isLoading: true,
    };
    const newState = basketSlice.reducer(initState, {
      type: createOrder.fulfilled.type,
      payload: { order: data.order },
    });
    const expectedState = {
      ...basketState,
      isLoading: false,
      order: data.order,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  test('should createOrder rejected', () => {
    const initState = {
      ...basketState,
      isLoading: true,
      order: data.order,
    };
    const newState = basketSlice.reducer(initState, {
      type: createOrder.rejected.type,
      error: { message: 'Test error' },
    });
    const expectedState = {
      ...basketState,
      isLoading: false,
      order: null,
    };

    expect(newState).toStrictEqual(expectedState);
  });
});
