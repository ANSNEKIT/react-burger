import { useAppSelector } from '@/services/hooks';
import { getIsAuthChecked, getUser } from '@/services/user/selectors';
import { Navigate, useLocation } from 'react-router-dom';

import Loader from '../app-loader/app-loader';

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
        <Loader />;
      </div>
    );
  }

  // Защищенный роут и не авторизованы
  if (!isOnlyUnAuth && !user) {
    return <Navigate to="/login" />;
  }

  // Не защищенный роут и авторизованы
  if (isOnlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};

export default Protected;
