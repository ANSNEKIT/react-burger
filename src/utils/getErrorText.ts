import type { SerializedError } from '@reduxjs/toolkit';

export const getErrorText = (error?: SerializedError): string => {
  if (!error) return '';

  if (error?.code) {
    if (+error.code >= 400 && +error.code < 500) {
      return 'Проверьте правильность введенных данных';
    }

    if (+error.code >= 500) {
      return `Ошибка сервера ${error.code}. Попробуйте позже`;
    }
  }

  if (error?.message) {
    return error.message;
  }

  return 'Возникла ошибка. Попробуйте еще раз';
};
