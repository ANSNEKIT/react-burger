import { getIngredientsApi } from '@/api/ingredients.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TIngredientsResponseBody } from '@/types/transport';

export const loadIngredients = createAsyncThunk<TIngredientsResponseBody, void>(
  'ingredients/loadIngredients',
  getIngredientsApi
);
