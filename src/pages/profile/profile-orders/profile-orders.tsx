import { Feed } from '@/components';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { getMapIngredints } from '@/services/ingredients/selectors';
import { connect, onClose, onOpen } from '@/services/profile-orders/actions';
import { getProfileOrdersSlice } from '@/services/profile-orders/selectors';
import { EWebsocketStatus } from '@/types/enums';
import { useEffect, useMemo, type ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

const ProfileOrders = (): ReactElement => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { status, orders, error } = useAppSelector(getProfileOrdersSlice);
  const mapIngredients = useAppSelector(getMapIngredints);

  const mappedIngredients = useMemo(() => new Map(mapIngredients), [mapIngredients]);
  const isLoading = useMemo(() => status === EWebsocketStatus.CONNECTING, [status]);

  useEffect(() => {
    if (status === EWebsocketStatus.DISCONNECT) {
      void dispatch(connect('wss://norma.education-services.ru/orders'));
    }

    if (status === EWebsocketStatus.OFFLINE) {
      void dispatch(onOpen());
    }

    console.log('location', location.state);

    return (): void => void dispatch(onClose());
  }, []);

  return (
    <div className="page pageCenter">
      <Feed
        feeds={orders}
        mapIngredients={mappedIngredients}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default ProfileOrders;
