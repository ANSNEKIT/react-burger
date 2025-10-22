import { userApi } from '@/api/auth.api';

import type { TFetchError, TFetchMethods } from '@/types/transport';

const checkResponse = <T extends Response>(res: Response): PromiseLike<T> => {
  if (res.ok) {
    return res.json();
  }
  // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
  return res.json().then((err) => Promise.reject(err));
};

export const customFetch = <TData = object, TResponse extends Response = Response>(
  method: TFetchMethods,
  url: string,
  data: TData = {} as TData,
  options: RequestInit = {}
): Promise<TResponse> => {
  const baseUrl = 'https://norma.education-services.ru/api';
  const resultUrl = baseUrl + url;
  return fetch(resultUrl, {
    method,
    ...options,
    headers: { ...options.headers, 'Content-Type': 'application/json; charset=utf-8' },
    body: method !== 'get' ? JSON.stringify(data) : undefined,
  }).then(checkResponse<TResponse>);
};

export const fetchWithRefresh = async <
  TData = object,
  TResponse extends Response = Response,
>(
  method: TFetchMethods,
  url: string,
  data: TData = {} as TData,
  options: RequestInit = {}
): Promise<TResponse> => {
  const optionsWithToken = {
    ...options,
    headers: {
      authorization: localStorage.getItem('accessToken') ?? '',
      ...options.headers,
    },
  };
  try {
    const res = await customFetch<TData, TResponse>(method, url, data, optionsWithToken);
    return res;
  } catch (err: unknown) {
    const error = err as TFetchError;

    if (error.message === 'jwt expired') {
      const refreshData = await userApi.refreshToken();
      optionsWithToken.headers.authorization = refreshData.accessToken;
      return customFetch<TData, TResponse>(method, url, data, optionsWithToken);
    }
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    return Promise.reject(err);
  }
};
