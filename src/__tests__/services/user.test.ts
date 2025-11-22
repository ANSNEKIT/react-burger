import {
  changeUser,
  login,
  logout,
  newPassword,
  register,
  resetPassword,
} from '@/services/user/actions';
import { userState, setAuthChecked, setUser, userSlice } from '@/services/user/reducer';
import { cleanup } from '@testing-library/react';

import data from '../mocks';

describe('user reducer testing', () => {
  afterEach(() => {
    cleanup();
  });

  test('should return correct state', () => {
    const newState = userSlice.reducer(undefined, { type: '' });

    expect(newState).toStrictEqual(userState);
  });

  test('should setUser set user', () => {
    const newState = userSlice.reducer(userState, setUser(data.user));

    const expectedState = {
      ...userState,
      user: data.user,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  test('should setAuthChecked isAuthChecked has true', () => {
    const newState = userSlice.reducer(userState, setAuthChecked(true));

    const expectedState = {
      ...userState,
      isAuthChecked: true,
    };

    expect(newState).toStrictEqual(expectedState);
  });
});

describe('user async actions', () => {
  afterEach(() => {
    cleanup();
  });

  describe('action login', () => {
    test('should login fulfilled', () => {
      const initState = {
        ...userState,
        isLoading: true,
      };
      const newState = userSlice.reducer(initState, {
        type: login.fulfilled.type,
        payload: { ...data.user },
      });
      const expectedState = {
        ...userState,
        isLoading: false,
        user: data.user,
        isAuthChecked: true,
      };

      expect(newState).toStrictEqual(expectedState);
    });
    test('should login rejected', () => {
      const initState = {
        ...userState,
        isLoading: true,
      };
      const newState = userSlice.reducer(initState, {
        type: login.rejected.type,
        error: { message: 'Test error' },
      });
      const expectedState = {
        ...userState,
        isLoading: false,
        user: null,
        error: 'Test error',
      };

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe('action register', () => {
    test('should register fulfilled', () => {
      const initState = {
        ...userState,
        isLoading: true,
      };
      const newState = userSlice.reducer(initState, {
        type: register.fulfilled.type,
        payload: { ...data.user },
      });
      const expectedState = {
        ...userState,
        isLoading: false,
        user: data.user,
        isAuthChecked: true,
      };

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe('action resetPassword', () => {
    test('should resetPassword fulfilled', () => {
      const initState = {
        ...userState,
        isLoading: true,
      };
      const newState = userSlice.reducer(initState, {
        type: resetPassword.fulfilled.type,
        payload: true,
      });
      const expectedState = {
        ...userState,
        isLoading: false,
      };

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe('action newPassword', () => {
    test('should newPassword fulfilled', () => {
      const initState = {
        ...userState,
        isLoading: true,
      };
      const newState = userSlice.reducer(initState, {
        type: newPassword.fulfilled.type,
        payload: true,
      });
      const expectedState = {
        ...userState,
        isLoading: false,
      };

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe('action changeUser', () => {
    test('should changeUser fulfilled', () => {
      const initState = {
        ...userState,
        isLoading: true,
      };
      const newState = userSlice.reducer(initState, {
        type: changeUser.fulfilled.type,
        payload: true,
      });
      const expectedState = {
        ...userState,
        isLoading: false,
      };

      expect(newState).toStrictEqual(expectedState);
    });
  });

  describe('action logout', () => {
    test('should logout fulfilled', () => {
      const initState = {
        ...userState,
        isLoading: true,
        user: data.user,
      };
      const newState = userSlice.reducer(initState, {
        type: logout.fulfilled.type,
        payload: {},
      });
      const expectedState = {
        ...userState,
        user: null,
      };

      expect(newState).toStrictEqual(expectedState);
    });
  });
});
