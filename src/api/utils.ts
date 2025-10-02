import type { TFetchMethods, TSuccessResponse } from './types';

export const getResponse = <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
};

export const customFetch = <TData = object, TResponse = TSuccessResponse>(
  method: TFetchMethods,
  url: string,
  data: TData = {} as TData,
  options: RequestInit = {}
): Promise<TResponse> => {
  const baseUrl = 'https://norma.nomoreparties.space/api';
  const resultUrl = baseUrl + url;
  return fetch(resultUrl, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: method !== 'get' ? JSON.stringify(data) : undefined,
    ...options,
  })
    .then(getResponse<TResponse>)
    .catch((err: Error) => {
      throw new Error(`HTTP error! ${err?.message}`);
    });
};
