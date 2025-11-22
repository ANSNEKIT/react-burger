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
import { afterEach } from 'vitest';

import data from '../mocks';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TIngredientState } from '@/services/ingredients/reducer';

describe('ingredient reducers', () => {
  afterEach(() => {
    cleanup();
  });

  test('should return correct state', () => {
    const newState = ingredientsSlice.reducer(undefined, { type: '' });

    expect(newState).toEqual(ingredientState);
  });

  test('should return correct action setActiveCatigory', () => {
    const initState = {
      ...ingredientState,
      activeCategory: EIngredientType.sauce,
    };
    const expectedState = {
      ...ingredientState,
      activeCategory: EIngredientType.bun,
    };
    const newState = ingredientsSlice.reducer(
      initState,
      setActiveCatigory(EIngredientType.bun)
    );

    expect(newState).toEqual(expectedState);
  });

  test('should return correct action setCurrentIngredient', () => {
    const initState = {
      ...ingredientState,
      ingredients: data.ingredients,
      currentIngredient: data.ingredientBun,
    };
    const expectedState = {
      ...ingredientState,
      ingredients: data.ingredients,
      currentIngredient: data.ingredientMain,
    };

    const newState = ingredientsSlice.reducer(
      initState,
      setCurrentIngredient(data.ingredientMain._id)
    );

    expect(newState).toEqual(expectedState);
  });

  describe('action decrementCount', () => {
    const modifyIngredients = [...data.ingredients];

    beforeEach(() => {
      const index = modifyIngredients.findIndex(
        (ing) => ing._id === data.ingredientMain._id
      );
      modifyIngredients[index] = {
        ...modifyIngredients[index],
        count: 3,
      };
    });

    test('should return correct action decrementCount', () => {
      const initState = {
        ...ingredientState,
        ingredients: modifyIngredients,
      };

      const expectedState = ingredientsSlice.reducer(
        initState,
        decrementCount(data.ingredientMain._id)
      );
      const expectedIngredient = expectedState.ingredients.find(
        (ing) => ing._id === data.ingredientMain._id
      );

      expect(expectedIngredient).not.toBeUndefined();
      expect(expectedIngredient?.count).toBe(2);
    });
  });

  describe('action clearBunCount', () => {
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
    const initState = {
      ...ingredientState,
      ingredients: modifyIngredients,
    };

    test('should return correct action clearBunCount', () => {
      const expectedState = ingredientsSlice.reducer(
        initState,
        clearBunCount(data.ingredientBun._id)
      );
      const expectedBun2 = expectedState.ingredients.find((ing) => ing._id === bun2._id);

      expect(expectedBun2).not.toBeUndefined();
      expect(expectedBun2?.count).toBeUndefined();
    });
  });

  describe('action clearCounts', () => {
    const modifyIngredients = [...data.ingredients];
    let modifyWitchCountIngredients = [];
    const initState = { ...ingredientState };

    beforeEach(() => {
      modifyWitchCountIngredients = modifyIngredients.map((ing, index) => ({
        ...ing,
        count: index + 5,
      }));
      initState.ingredients = modifyWitchCountIngredients;
    });

    test('should return ingredients with count = undefined', () => {
      const expectedState = ingredientsSlice.reducer(initState, clearCounts());
      describe('log ingredients -> count', () => {
        afterEach(() => {
          cleanup();
        });

        test.each(expectedState.ingredients)(
          'ingCount($0.count) -> undefined',
          ({ count }) => {
            expect(count).toBeUndefined();
          }
        );
      });
    });
  });

  describe('action incrementCount', () => {
    let initState: TIngredientState | undefined;
    const ingredientId = data.ingredientMain._id;
    const mockPayload = { ingredientId: data.ingredientBun._id, stepCount: 2 };

    beforeEach(() => {
      initState = {
        ...ingredientState,
        ingredients: [...data.ingredients],
      };
    });

    test('should return correct action incrementCount + 1', () => {
      const newState = ingredientsSlice.reducer(
        initState,
        incrementCount({ ingredientId })
      );
      const newIngredient = newState.ingredients.find((ing) => ing._id === ingredientId);

      expect(newIngredient).not.toBeUndefined();
      expect(newIngredient?.count).toBe(1);
    });

    test('should return correct action incrementCount + 2', () => {
      const newState = ingredientsSlice.reducer(initState, incrementCount(mockPayload));
      const expectedIngredient = newState.ingredients.find(
        (ing) => ing._id === mockPayload.ingredientId
      );

      expect(expectedIngredient).not.toBeUndefined();
      expect(expectedIngredient?.count).toBe(2);
    });
  });
});

describe('ingredient async actions', () => {
  afterEach(() => {
    cleanup();
  });

  test('should loadIngredients fullfilled', () => {
    const copyMockIngredients = [...data.ingredients];
    const initState: TIngredientState = {
      ...ingredientState,
      isLoading: true,
    };
    const newState = ingredientsSlice.reducer(initState, {
      type: loadIngredients.fulfilled.type,
      payload: { data: copyMockIngredients },
    });
    const expectedState = {
      ...ingredientState,
      isLoading: false,
      ingredients: copyMockIngredients,
      mapIngredients: copyMockIngredients.map((ing) => [ing._id, ing]),
    };

    expect(newState).toStrictEqual(expectedState);
  });

  test('should loadIngredients rejected', () => {
    const initState = {
      ...ingredientState,
      isLoading: true,
    };
    const newState = ingredientsSlice.reducer(initState, {
      type: loadIngredients.rejected.type,
      error: { message: 'Test error' },
    });
    const expectedState = {
      ...ingredientState,
      error: 'Test error',
    };

    expect(newState).toStrictEqual(expectedState);
  });
});
