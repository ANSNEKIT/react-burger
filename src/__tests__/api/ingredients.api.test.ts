import { getIngredientsApi } from '@/api/ingredients.api';
import { cleanup } from '@testing-library/react';
import fetchMock from 'fetch-mock';

import data from '../mocks';

describe('GET getingredientsApi', () => {
  const url = 'end:/api/ingredients';
  const responseOptions = {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  };
  const errorResponseBody = { message: 'Error load ingredients' };
  const options = { delay: 300 };

  afterEach(() => {
    fetchMock.unmockGlobal();
    fetchMock.removeRoutes();
    fetchMock.clearHistory();
    cleanup();
  });

  test('should getIngredientsApi fulfilled', async () => {
    fetchMock
      .mockGlobal()
      .getOnce(url, { ...responseOptions, body: data.ingredients }, options);

    const ingredients = await getIngredientsApi();
    const isCalled = fetchMock.callHistory.called(url);
    const lastCall = fetchMock.callHistory.lastCall(url);

    expect(isCalled).toBe(true);
    expect(lastCall?.response?.status).toBe(200);
    expect(ingredients).toStrictEqual(data.ingredients);
  });

  test('should getIngredientsApi rejected', async () => {
    fetchMock
      .mockGlobal()
      .getOnce(
        url,
        { ...responseOptions, status: 404, body: errorResponseBody },
        options
      );

    await expect(getIngredientsApi()).rejects.toThrow('Error load ingredients');
  });

  test('should getIngredientsApi throw network 500 error', async () => {
    fetchMock
      .mockGlobal()
      .getOnce(url, { throws: new Error('Network connection failed') }, options);

    await expect(getIngredientsApi()).rejects.toThrow('Network connection failed');
  });
});
