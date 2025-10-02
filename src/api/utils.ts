import type { TFetchMethods, TFetchResponse } from './types';

export const getResponse = <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
};

export const customFetch = <TData, TResponse>(
  method: TFetchMethods,
  url: string,
  data: TData,
  options: RequestInit = {}
): Promise<TFetchResponse<TResponse>> => {
  const baseUrl = 'https://norma.nomoreparties.space/api';
  const resultUrl = baseUrl + url;
  return fetch(resultUrl, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    ...options,
  })
    .then(getResponse<TFetchResponse<TResponse>>)
    .catch((err: Error) => {
      throw new Error(`HTTP error! ${err?.message}`);
    });
};
