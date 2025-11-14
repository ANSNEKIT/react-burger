import { Feed } from '@/components';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { getMapIngredints } from '@/services/ingredients/selectors';
import { connect, disconnect } from '@/services/profile-orders/actions';
import { getProfileOrdersSlice } from '@/services/profile-orders/selectors';
import { EWebsocketStatus } from '@/types/enums';
import { useEffect, useMemo, type ReactElement } from 'react';

const ProfileOrders = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { status, orders, error } = useAppSelector(getProfileOrdersSlice);
  const mapIngredients = useAppSelector(getMapIngredints);

  const mappedIngredients = useMemo(() => new Map(mapIngredients), [mapIngredients]);
  const isLoading = useMemo(
    () =>
      status === EWebsocketStatus.CONNECTING ||
      (status === EWebsocketStatus.OFFLINE && !error),
    [status, error]
  );

  useEffect(() => {
    void dispatch(connect('wss://norma.education-services.ru/orders'));

    return (): void => void dispatch(disconnect());
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
