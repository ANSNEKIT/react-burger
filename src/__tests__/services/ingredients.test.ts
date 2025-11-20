import { loadIngredients } from '@/services/ingredients/actions';
import {
  clearBunCount,
  clearCounts,
  decrementCount,
  incrementCount,
  ingredientsSlice,
  ingredientState,
  setActiveCatigory,
  setCurrentIngredient,
} from '@/services/ingredients/reducer';
import { EIngredientType } from '@/types/enums';
import { cleanup } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { afterEach, vi } from 'vitest';

import data from '../mocks';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TIngredientState } from '@/services/ingredients/reducer';
import type { TActionPayloadError } from '@/types/transport';

describe('ingredient reducer testing', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test('should return correct state', () => {
    const newState = ingredientsSlice.reducer(undefined, { type: '' });

    expect(newState).toEqual(ingredientState);
  });

  describe('action setActiveCatigory', () => {
    test('should return correct action setActiveCatigory', () => {
      const expectedState = {
        ...ingredientState,
        activeCategory: EIngredientType.bun,
      };

      const setActiveCatigoryAction = setActiveCatigory(EIngredientType.bun);
      const newState = ingredientsSlice.reducer(undefined, setActiveCatigoryAction);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('action setCurrentIngredient', () => {
    test('should return correct action setCurrentIngredient', () => {
      const state = {
        ...ingredientState,
        ingredients: data.ingredients,
      };
      const expectedState = {
        ...ingredientState,
        ingredients: data.ingredients,
        currentIngredient: data.ingredientMain,
      };

      const setCurrentIngredientAction = setCurrentIngredient(data.ingredientMain._id);
      const newState = ingredientsSlice.reducer(state, setCurrentIngredientAction);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('action decrementCount', () => {
    test('should return correct action decrementCount', () => {
      const modifyIngredients = [...data.ingredients];
      const index = modifyIngredients.findIndex(
        (ing) => ing._id === data.ingredientMain._id
      );
      modifyIngredients[index] = {
        ...modifyIngredients[index],
        count: 3,
      };
      const state = {
        ...ingredientState,
        ingredients: modifyIngredients,
      };

      const decrementCountAction = decrementCount(data.ingredientMain._id);
      const expectedState = ingredientsSlice.reducer(state, decrementCountAction);
      const expectedIngredient = expectedState.ingredients.find(
        (ing) => ing._id === data.ingredientMain._id
      );

      expect(expectedIngredient).not.toBeUndefined();
      expect(expectedIngredient?.count).toBe(2);
    });
  });

  describe('action clearBunCount', () => {
    test('should return correct action clearBunCount', () => {
      const bun2: TIngredientDTO = {
        _id: 'bun2',
        name: 'Краторная булка bun 2',
        type: 'bun',
        proteins: 81,
        fat: 25,
        carbohydrates: 54,
        calories: 421,
        price: 1256,
        count: 2,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
      };
      const modifyIngredients = [...data.ingredients, bun2];
      const state = {
        ...ingredientState,
        ingredients: modifyIngredients,
      };

      const clearBunCountAction = clearBunCount(data.ingredientBun._id);
      const expectedState = ingredientsSlice.reducer(state, clearBunCountAction);
      const expectedBun2 = expectedState.ingredients.find((ing) => ing._id === bun2._id);

      expect(expectedBun2).not.toBeUndefined();
      expect(expectedBun2?.count).toBeUndefined();
    });
  });

  describe('action clearCounts', () => {
    test('should return ingredients with count = undefined', () => {
      const modifyIngredients = [...data.ingredients];
      const modifyWitchCountIngredients = modifyIngredients.map((ing, index) => ({
        ...ing,
        count: index + 5,
      }));

      const clearCountState = {
        ...ingredientState,
        ingredients: modifyWitchCountIngredients,
      };

      const clearCountsAction = clearCounts();
      const expectedClearCountState = ingredientsSlice.reducer(
        clearCountState,
        clearCountsAction
      );

      describe('log ingredients -> count', () => {
        afterEach(() => {
          cleanup();
        });

        test.each(expectedClearCountState.ingredients)(
          'ingCount($0.count) -> undefined',
          ({ count }) => {
            expect(count).toBeUndefined();
          }
        );
      });
    });
  });

  describe('action incrementCount', () => {
    let state: TIngredientState | undefined;
    beforeEach(() => {
      state = {
        ...ingredientState,
        ingredients: [...data.ingredients],
      };

      cleanup();
    });

    afterEach(() => {
      state = undefined;
      cleanup();
    });
    test('should return correct action incrementCount + 1', () => {
      const ingredientId = data.ingredientMain._id;

      const incrementCountAction = incrementCount({ ingredientId });
      const newState = ingredientsSlice.reducer(state, incrementCountAction);

      const newIngredient = newState.ingredients.find((ing) => ing._id === ingredientId);

      expect(newIngredient).not.toBeUndefined();
      expect(newIngredient?.count).toBe(1);
    });

    test('should return correct action incrementCount + 2', () => {
      const mockPayload = { ingredientId: data.ingredientBun._id, stepCount: 2 };

      const incrementCountAction = incrementCount(mockPayload);
      const newState = ingredientsSlice.reducer(state, incrementCountAction);
      const expectedIngredient = newState.ingredients.find(
        (ing) => ing._id === mockPayload.ingredientId
      );

      expect(expectedIngredient).not.toBeUndefined();
      expect(expectedIngredient?.count).toBe(2);
    });
  });
});

describe('ingredient async actions', () => {
  // beforeEach(() => {
  //   fetchMock.unmockGlobal();
  //   fetchMock.removeRoutes();
  //   fetchMock.clearHistory();
  //   vi.clearAllMocks();
  //   cleanup();
  // });

  afterEach(() => {
    fetchMock.unmockGlobal();
    fetchMock.removeRoutes();
    fetchMock.clearHistory();
    vi.clearAllMocks();
    cleanup();
  });

  test('should loadIngredients fulfilled', async () => {
    fetchMock.mockGlobal().getOnce(
      'end:/api/ingredients',
      {
        body: data.ingredients,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      },
      {
        delay: 500,
      }
    );

    const dispatch = vi.fn();
    const getState = vi.fn(() => ({}));

    const response = await loadIngredients()(dispatch, getState, undefined);
    const isCalled = fetchMock.callHistory.called('end:/api/ingredients');

    expect(isCalled).toBe(true);
    expect(response.payload).toEqual(data.ingredients);
    expect(response.type).toBe(loadIngredients.fulfilled.type);
  });

  test('should loadIngredients rejected', async () => {
    fetchMock.mockGlobal().getOnce(
      'end:/api/ingredients',
      {
        status: 404,
        body: { message: 'Error load ingredients' },
      },
      {
        name: 'fetch ingredients',
        delay: 500,
      }
    );

    const dispatch = vi.fn();
    const getState = vi.fn(() => ({}));

    const response = await loadIngredients()(dispatch, getState, undefined);
    const expectErrorText = (response as TActionPayloadError)?.error?.message;
    const isCalled = fetchMock.callHistory.called('end:/api/ingredients');

    expect(isCalled).toBe(true);
    expect(expectErrorText).toBe('Error load ingredients');
    expect(response.type).toBe(loadIngredients.rejected.type);
  });

  test('should loadIngredients throw network error', async () => {
    fetchMock.mockGlobal().getOnce(
      'end:/api/ingredients',
      {
        throws: new Error('Network connection failed'),
      },
      {
        delay: 500,
      }
    );

    const dispatch = vi.fn();
    const getState = vi.fn(() => ({}));

    const response = await loadIngredients()(dispatch, getState, undefined);
    const expectErrorText = (response as TActionPayloadError)?.error?.message;
    const isCalled = fetchMock.callHistory.called('end:/api/ingredients');

    expect(isCalled).toBe(true);
    expect(expectErrorText).toBe('Network connection failed');
    expect(response.type).toBe(loadIngredients.rejected.type);
  });
});
