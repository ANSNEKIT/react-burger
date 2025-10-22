import type { RootState } from '../store';
import type { TUserState } from './reducer';
import type { TUserAuth } from '@/types/types';

export const getUserSlice = (store: RootState): TUserState => store.userSlice;
export const getUser = (store: RootState): TUserAuth | null => store.userSlice.user;
export const getIsAuthChecked = (store: RootState): boolean =>
  store.userSlice.isAuthChecked;
export const getIsLoading = (store: RootState): boolean => store.userSlice.isLoading;
export const getError = (store: RootState): string | null => store.userSlice.error;
