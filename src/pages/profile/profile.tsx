import Menu, { type TMenuItem } from '@/components/menu/menu';
import { useAppDispatch } from '@/services/hooks';
import { logout } from '@/services/user/actions';
import { Outlet } from 'react-router-dom';

import type { ReactElement } from 'react';

import styles from './profile-dashboard.module.css';

const Profile = (): ReactElement => {
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

  return (
    <div className={`page ${styles.profile}`}>
      <Menu links={links} buttons={buttons} onClickButton={onClickButton} />
      <Outlet />
    </div>
  );
};

export default Profile;
