import { userApi } from '@/api/auth.api';
import { cleanup } from '@testing-library/react';
import fetchMock from 'fetch-mock';

import data from '../mocks';

import type { TLoginData } from '@/types/transport';

describe('check userAPI metods', () => {
  const responseOptions = {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  };
  const errorResponseBody = { message: 'Test error' };
  const options = { delay: 300 };

  afterEach(() => {
    fetchMock.unmockGlobal();
    fetchMock.removeRoutes();
    fetchMock.clearHistory();
    cleanup();
  });

  describe('POST login', () => {
    const loginUrl = 'end:/api/auth/login';
    const mockPayloadLogin: TLoginData = { ...data.registerPayload };
    test('should login fulfilled', async () => {
      fetchMock
        .mockGlobal()
        .postOnce(loginUrl, { ...responseOptions, body: { user: data.user } }, options);

      const resData = await userApi.login(mockPayloadLogin);
      const isCalled = fetchMock.callHistory.called(loginUrl);
      const lastCall = fetchMock.callHistory.lastCall(loginUrl);

      expect(isCalled).toBe(true);
      expect(lastCall?.response?.status).toBe(200);
      expect(resData.user).toStrictEqual(data.user);
    });

    test('should login rejected', async () => {
      fetchMock
        .mockGlobal()
        .postOnce(
          loginUrl,
          { ...responseOptions, status: 404, body: errorResponseBody },
          options
        );

      await expect(userApi.login(mockPayloadLogin)).rejects.toThrow('Test error');
    });
  });

  describe('POST register', () => {
    const registerUrl = 'end:/api/auth/register';
    const mockPayloadRegister = { ...data.registerPayload };

    test('should register fulfilled', async () => {
      fetchMock
        .mockGlobal()
        .postOnce(
          registerUrl,
          { ...responseOptions, body: { user: data.user } },
          options
        );

      const resData = await userApi.register(mockPayloadRegister);
      const isCalled = fetchMock.callHistory.called(registerUrl);
      const lastCall = fetchMock.callHistory.lastCall(registerUrl);

      expect(isCalled).toBe(true);
      expect(lastCall?.response?.status).toBe(200);
      expect(resData.user).toStrictEqual(data.user);
    });

    test('should register rejected', async () => {
      fetchMock
        .mockGlobal()
        .postOnce(
          registerUrl,
          { ...responseOptions, status: 404, body: errorResponseBody },
          options
        );

      await expect(userApi.register(mockPayloadRegister)).rejects.toThrow('Test error');
    });
  });

  describe('POST resetPassword', () => {
    const resetPasswordUrl = 'end:/api/password-reset';
    const mockPayloadResetPassword = { email: data.user.email };

    test('should resetPassword fulfilled', async () => {
      fetchMock
        .mockGlobal()
        .postOnce(
          resetPasswordUrl,
          { ...responseOptions, body: { success: true } },
          options
        );

      const isSuccessed = await userApi.resetPassword(mockPayloadResetPassword);
      const isCalled = fetchMock.callHistory.called(resetPasswordUrl);
      const lastCall = fetchMock.callHistory.lastCall(resetPasswordUrl);

      expect(isCalled).toBe(true);
      expect(lastCall?.response?.status).toBe(200);
      expect(isSuccessed).toBe(true);
    });

    test('should resetPassword rejected', async () => {
      fetchMock
        .mockGlobal()
        .postOnce(
          resetPasswordUrl,
          { ...responseOptions, status: 404, body: errorResponseBody },
          options
        );

      await expect(userApi.resetPassword(mockPayloadResetPassword)).rejects.toThrow(
        'Test error'
      );
    });

    test('should resetPassword rejected with throw network 500 error', async () => {
      fetchMock
        .mockGlobal()
        .postOnce(
          resetPasswordUrl,
          { throws: new Error('Network connection failed') },
          options
        );

      await expect(userApi.resetPassword(mockPayloadResetPassword)).rejects.toThrow(
        'Network connection failed'
      );
    });
  });

  describe('POST newPassword', () => {
    const newPasswordUrl = 'end:/api/password-reset/reset';
    const mockPayloadNewPassword = {
      password: data.registerPayload.password,
      token: '111',
    };

    test('should newPassword fulfilled', async () => {
      fetchMock
        .mockGlobal()
        .postOnce(
          newPasswordUrl,
          { ...responseOptions, body: { success: true } },
          options
        );

      const isSuccessed = await userApi.newPassword(mockPayloadNewPassword);
      const isCalled = fetchMock.callHistory.called(newPasswordUrl);
      const lastCall = fetchMock.callHistory.lastCall(newPasswordUrl);

      expect(isCalled).toBe(true);
      expect(lastCall?.response?.status).toBe(200);
      expect(isSuccessed).toBe(true);
    });

    test('should newPassword rejected', async () => {
      fetchMock
        .mockGlobal()
        .postOnce(
          newPasswordUrl,
          { ...responseOptions, status: 404, body: errorResponseBody },
          options
        );

      await expect(userApi.newPassword(mockPayloadNewPassword)).rejects.toThrow(
        'Test error'
      );
    });

    test('should newPassword rejected with throw network 500 error', async () => {
      fetchMock
        .mockGlobal()
        .postOnce(
          newPasswordUrl,
          { throws: new Error('Network connection failed') },
          options
        );

      await expect(userApi.newPassword(mockPayloadNewPassword)).rejects.toThrow(
        'Network connection failed'
      );
    });
  });

  describe('PATCH changeUser', () => {
    const changeUserUrl = 'end:/api/auth/user';
    const mockPayloadChangeUser = { name: 'test1' };

    test('should changeUser fulfilled', async () => {
      fetchMock
        .mockGlobal()
        .patchOnce(
          changeUserUrl,
          { ...responseOptions, body: { success: true } },
          options
        );

      const resData = await userApi.changeUser(mockPayloadChangeUser);
      const isCalled = fetchMock.callHistory.called(changeUserUrl);
      const lastCall = fetchMock.callHistory.lastCall(changeUserUrl);

      expect(isCalled).toBe(true);
      expect(lastCall?.response?.status).toBe(200);
      expect(resData.success).toBe(true);
    });
  });

  describe('POST logout', () => {
    const logoutUrl = 'end:/api/auth/logout';

    test('should logout fulfilled', async () => {
      fetchMock
        .mockGlobal()
        .postOnce(logoutUrl, { ...responseOptions, body: { success: true } }, options);

      const resData = await userApi.logout();
      const isCalled = fetchMock.callHistory.called(logoutUrl);
      const lastCall = fetchMock.callHistory.lastCall(logoutUrl);

      expect(isCalled).toBe(true);
      expect(lastCall?.response?.status).toBe(200);
      expect(resData.success).toBe(true);
    });
  });
});
