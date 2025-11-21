import {
  changeUser,
  login,
  logout,
  newPassword,
  register,
  resetPassword,
} from '@/services/user/actions';
import {
  initialUserState,
  setAuthChecked,
  setUser,
  userSlice,
} from '@/services/user/reducer';
import { cleanup } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { vi } from 'vitest';

import data from '../mocks';

import type { TLoginData } from '@/types/transport';

describe('user reducer testing', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });
  test('should return correct state', () => {
    const newState = userSlice.reducer(undefined, { type: '' });

    expect(newState).toStrictEqual(initialUserState);
  });

  describe('action setUser', () => {
    test('should return user', () => {
      const setUserAction = setUser(data.user);
      const newState = userSlice.reducer(undefined, setUserAction);

      const expectedState = {
        ...initialUserState,
        user: data.user,
      };

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe('action setAuthChecked', () => {
    test('should return isAuthChecked is true', () => {
      const setAuthCheckedAction = setAuthChecked(true);
      const newState = userSlice.reducer(undefined, setAuthCheckedAction);

      const expectedState = {
        ...initialUserState,
        isAuthChecked: true,
      };

      expect(newState).toStrictEqual(expectedState);
    });
  });
});

describe('user async actions', () => {
  const dispatch = vi.fn();
  const getState = vi.fn(() => ({}));

  afterEach(() => {
    fetchMock.unmockGlobal();
    fetchMock.removeRoutes();
    fetchMock.clearHistory();
    vi.clearAllMocks();
    cleanup();
  });

  describe('action login', () => {
    test('should login fulfilled', async () => {
      fetchMock.mockGlobal().postOnce(
        'end:/api/auth/login',
        {
          status: 200,
          body: { user: data.user },
        },
        {
          delay: 500,
        }
      );

      const mockPayload: TLoginData = { ...data.registerPayload };
      const response = await login(mockPayload)(dispatch, getState, undefined);
      const isCalled = fetchMock.callHistory.called('end:/api/auth/login');

      expect(isCalled).toBe(true);
      expect(response.payload).toEqual(data.user);
      expect(response.type).toBe(login.fulfilled.type);
    });

    test('should login set user', () => {
      const payload = { email: 'test@test.ru', name: 'test' };
      const newState = userSlice.reducer(undefined, {
        type: login.fulfilled.type,
        payload,
      });
      const expectedState = {
        ...initialUserState,
        user: payload,
        isAuthChecked: true,
      };

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe('action register', () => {
    test('should register fulfilled', async () => {
      fetchMock.mockGlobal().postOnce(
        'end:/api/auth/register',
        {
          status: 200,
          body: { user: data.user },
        },
        {
          delay: 500,
        }
      );

      const response = await register(data.registerPayload)(
        dispatch,
        getState,
        undefined
      );
      const isCalled = fetchMock.callHistory.called('end:/api/auth/register');

      expect(isCalled).toBe(true);
      expect(response.payload).toEqual(data.user);
      expect(response.type).toBe(register.fulfilled.type);
    });

    test('should register set user', () => {
      const payload = { email: 'test@test.ru', name: 'test' };
      const newState = userSlice.reducer(undefined, {
        type: register.fulfilled.type,
        payload,
      });
      const expectedState = {
        ...initialUserState,
        user: payload,
        isAuthChecked: true,
      };

      expect(newState).toStrictEqual(expectedState);
    });
  });

  test('should resetPassword fulfilled', async () => {
    fetchMock.mockGlobal().postOnce(
      'end:/api/password-reset',
      {
        status: 200,
        body: { success: true },
      },
      {
        delay: 500,
      }
    );

    const payload = { email: data.user.email };
    const response = await resetPassword(payload)(dispatch, getState, undefined);
    const isCalled = fetchMock.callHistory.called('end:/api/password-reset');

    expect(isCalled).toBe(true);
    expect(response.payload).toBe(true);
    expect(response.type).toBe(resetPassword.fulfilled.type);
  });

  test('should newPassword fulfilled', async () => {
    fetchMock.mockGlobal().postOnce(
      'end:/api/password-reset/reset',
      {
        status: 200,
        body: { success: true },
      },
      {
        delay: 500,
      }
    );

    const payload = { password: data.registerPayload.password, token: '111' };
    const response = await newPassword(payload)(dispatch, getState, undefined);
    const isCalled = fetchMock.callHistory.called('end:/api/password-reset/reset');

    expect(isCalled).toBe(true);
    expect(response.payload).toEqual({ success: true });
    expect(response.type).toBe(resetPassword.fulfilled.type);
  });

  test('should changeUser fulfilled', async () => {
    fetchMock.mockGlobal().patchOnce(
      'end:/api/auth/user',
      {
        status: 200,
        body: { success: true },
      },
      {
        delay: 500,
      }
    );

    const response = await changeUser({ name: 'test1' })(dispatch, getState, undefined);
    const isCalled = fetchMock.callHistory.called('end:/api/auth/user');

    expect(isCalled).toBe(true);
    expect(response.payload).toEqual({ success: true });
    expect(response.type).toBe(changeUser.fulfilled.type);
  });

  describe('action logout', () => {
    test('should logout fulfilled', async () => {
      fetchMock.mockGlobal().postOnce(
        'end:/api/auth/logout',
        {
          status: 200,
          body: { success: true },
        },
        {
          delay: 500,
        }
      );

      const response = await logout()(dispatch, getState, undefined);
      const isCalled = fetchMock.callHistory.called('end:/api/auth/logout');

      expect(isCalled).toBe(true);
      expect(response.payload).toEqual({ success: true });
      expect(response.type).toBe(logout.fulfilled.type);
    });

    test('should logout clear user', () => {
      const newState = userSlice.reducer(undefined, {
        type: logout.fulfilled.type,
      });
      const expectedState = {
        ...initialUserState,
        user: null,
      };

      expect(newState).toStrictEqual(expectedState);
    });
  });
});
