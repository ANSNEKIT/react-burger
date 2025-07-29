import { getIngredients } from '@/api/ingredients.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TFetchResponse } from './../../utils/types';
import type { TIngredientDTO } from '@/contracts/ingredientDTO';

export const loadIngredients = createAsyncThunk<TFetchResponse<TIngredientDTO[]>, void>(
  'ingredients/loadIngredients',
  async () => {
    return getIngredients();
  }
);
