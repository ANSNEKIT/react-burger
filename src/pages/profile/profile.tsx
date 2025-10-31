import Loader from '@/components/loader/loader';
import Menu from '@/components/menu/menu';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { logout } from '@/services/user/actions';
import { getIsLoading } from '@/services/user/selectors';
import { Outlet } from 'react-router-dom';

import type { TMenuItem } from '@/types/types';
import type { ReactElement } from 'react';

import styles from './profile-dashboard.module.css';

const Profile = (): ReactElement => {
  const isLoading = useAppSelector(getIsLoading);
  const dispatch = useAppDispatch();
  const links = [
    { id: crypto.randomUUID(), name: 'Профиль', to: '/profile' },
    { id: crypto.randomUUID(), name: 'История заказов', to: '/profile/orders' },
  ];
  const buttons = [
    { id: crypto.randomUUID(), type: 'logout', name: 'Выход', to: '/login' },
  ];

  const onClickButton = (btn: TMenuItem): void => {
    if (btn.type === 'logout') {
      void dispatch(logout());
    }
  };

  if (isLoading) {
    return (
      <div className="page pageCenter">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className={`page ${styles.profile}`}>
      <Menu links={links} buttons={buttons} onClickButton={onClickButton} />
      <Outlet />
    </div>
  );
};

export default Profile;
