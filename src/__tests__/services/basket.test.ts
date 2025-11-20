import { createOrder } from '@/services/basket/actions';
import {
  initialState,
  basketSlice,
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearBasket,
} from '@/services/basket/reducer';
import { cleanup } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { vi } from 'vitest';

import data from '../mocks';

import type { TBasketState } from '@/services/basket/reducer';

describe('basket reducer test', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });
  test('should return correct state', () => {
    const newState = basketSlice.reducer(undefined, { type: '' });

    expect(newState).toEqual(initialState);
  });

  test('should return correct action setBun', () => {
    const expectedState = {
      ...initialState,
      bun: data.ingredientBun,
    };

    const setBunAction = setBun(data.ingredientBun);
    const newState = basketSlice.reducer(undefined, setBunAction);

    expect(newState).toEqual(expectedState);
  });

  test('should return correct action addIngredient', () => {
    const expectedState = {
      ...initialState,
      ingredients: [data.ingredientMain],
    };

    const addIngredientAction = addIngredient(data.ingredientMain);
    const newState = basketSlice.reducer(undefined, addIngredientAction);

    expect(newState).toEqual(expectedState);
  });

  test('should return correct action removeIngredient', () => {
    const state = {
      ...initialState,
      ingredients: [data.ingredientMain],
    };

    const expectedState = {
      ...initialState,
      ingredients: [],
    };

    const removeIngredientAction = removeIngredient(data.ingredientMain._id);
    const newState = basketSlice.reducer(state, removeIngredientAction);

    expect(newState).toEqual(expectedState);
  });

  test('should return correct action clearBasket', () => {
    const state = {
      ...initialState,
      bun: data.ingredientBun,
      ingredients: [data.ingredientMain],
      order: data.order,
    };

    const clearBasketAction = clearBasket();
    const newState = basketSlice.reducer(state, clearBasketAction);

    expect(newState.ingredients).toStrictEqual([]);
    expect(newState.bun).toStrictEqual(null);
    expect(newState.order).toStrictEqual(null);
  });

  describe('check action moveIngredient', () => {
    let state: TBasketState;

    beforeEach(() => {
      state = {
        ...initialState,
        ingredients: [...data.ingredients],
      };
    });

    test('should move dragIndex: 1 to hoverIndex: 3', () => {
      // Перемещаем элемент с индекса 1 на индекс 3
      // ingredients:
      // start:   [bun1, main1, 3, 4, 5]
      // return:  [bun1, 3, 4, main1, 5]
      const moveIngredientAction = moveIngredient({ dragIndex: 1, hoverIndex: 3 });
      const newState = basketSlice.reducer(state, moveIngredientAction);

      // Проверяем новый порядок
      expect(newState.ingredients).toHaveLength(5);
      expect(newState.ingredients[0]._id).toBe('bun1');
      expect(newState.ingredients[1]._id).toBe('3');
      expect(newState.ingredients[2]._id).toBe('4');
      expect(newState.ingredients[3]._id).toBe('main1');
      expect(newState.ingredients[4]._id).toBe('5');
    });
  });
});

describe('basket async actions', () => {
  afterEach(() => {
    fetchMock.unmockGlobal();
    fetchMock.clearHistory();
    vi.clearAllMocks();
    cleanup();
  });

  test('should return createOrder fulfilled', async () => {
    const ingredientIds = data.ingredients.map((ing) => ing._id);
    const mockPayload = { ingredients: ingredientIds };

    fetchMock.mockGlobal().postOnce(
      'end:/orders',
      {
        body: data.order,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
      {
        delay: 1000,
      }
    );

    const dispatch = vi.fn();
    const getState = vi.fn(() => ({}));

    const response = await createOrder(mockPayload)(dispatch, getState, undefined);

    expect(response.payload).toEqual(data.order);
    expect(response.type).toBe(createOrder.fulfilled.type);
  });

  test('should return createOrder rejected', () => {
    const ingredientIds = data.ingredients.map((ing) => ing._id);
    const mockPayload = { ingredients: ingredientIds };

    const newState = basketSlice.reducer(undefined, {
      type: createOrder.rejected.type,
      payload: mockPayload,
    });

    expect(newState.order).toStrictEqual(null);
    expect(newState.isLoading).toBe(false);
  });
});
