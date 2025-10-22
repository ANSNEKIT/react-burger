import Loader from '@/components/loader/loader';
import { useAppSelector } from '@/services/hooks';
import { getIsAuthChecked, getUser } from '@/services/user/selectors';
import { Navigate, useLocation } from 'react-router-dom';

import type { ReactElement } from 'react';
import type { Location } from 'react-router-dom';

type TAppProtectedProps = {
  component: ReactElement;
  isOnlyUnAuth?: boolean;
};

const Protected = ({
  isOnlyUnAuth = false,
  component,
}: TAppProtectedProps): ReactElement => {
  const user = useAppSelector(getUser);
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const location = useLocation() as Location<{ from: { pathname: string } }>;
  const isEmailConfirmed = Boolean(localStorage.getItem('isEmailConfirmed') ?? false);

  if (!isAuthChecked) {
    return (
      <div className="page pageCenter">
        <h2 className="text text_type_main-large">Загрузка...</h2>
        <Loader size="large" />;
      </div>
    );
  }

  // Роуты для авторизованных но зашел неавторизованный
  if (!isOnlyUnAuth && !user) {
    return <Navigate to={{ pathname: '/login' }} state={{ from: location.pathname }} />;
  }

  // Роуты Логин, регистрация и прошли авторизацию
  if (isOnlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  // Роут сброса пароля
  if (isOnlyUnAuth && location.pathname === '/reset-password') {
    if (isEmailConfirmed) {
      localStorage.removeItem('isEmailConfirmed');
    } else {
      return <Navigate to="/forgot-password" replace={true} />;
    }
  }

  return component;
};

export default Protected;
