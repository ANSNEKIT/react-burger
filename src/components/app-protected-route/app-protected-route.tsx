import Loader from '@/components/loader/loader';
import { useAppSelector } from '@/services/hooks';
import { getIsAuthChecked, getUser } from '@/services/user/selectors';
import { Navigate, useLocation } from 'react-router-dom';

import type { ReactElement } from 'react';
import type { Location } from 'react-router-dom';

type TAppProtectedProps = {
  isOnlyUnAuth?: boolean;
  component: ReactElement;
};

const Protected = ({
  isOnlyUnAuth = false,
  component,
}: TAppProtectedProps): ReactElement => {
  const user = useAppSelector(getUser);
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const location = useLocation() as Location<{ from: { pathname: string } }>;

  if (!isAuthChecked) {
    return (
      <div className="page pageCenter">
        <h2 className="text text_type_main-large">Загрузка...</h2>
        <Loader size="large" />;
      </div>
    );
  }

  // Роуты для авторизованных и протух токен
  if (!isOnlyUnAuth && !user) {
    return <Navigate to="/login" />;
  }

  // Роуты Логин, регистрация и прошли авторизацию
  if (isOnlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};

export default Protected;
