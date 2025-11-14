import { Feed } from '@/components';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { loadIngredients } from '@/services/ingredients/actions';
import { getIngredientsState, getMapIngredints } from '@/services/ingredients/selectors';
import { connect, disconnect } from '@/services/profile-orders/actions';
import { getProfileOrdersSlice } from '@/services/profile-orders/selectors';
import { EWebsocketStatus } from '@/types/enums';
import { useEffect, useMemo, type ReactElement } from 'react';

const ProfileOrders = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { ingredients, isLoading: isLoadingIngs } = useAppSelector(getIngredientsState);
  const { status, orders, error } = useAppSelector(getProfileOrdersSlice);
  const mapIngredients = useAppSelector(getMapIngredints);

  const mappedIngredients = useMemo(() => new Map(mapIngredients), [mapIngredients]);
  const isLoading = useMemo(() => status === EWebsocketStatus.CONNECTING, [status]);

  useEffect(() => {
    if (!isLoadingIngs && ingredients.length === 0) {
      void dispatch(loadIngredients()).then(() => {
        void dispatch(connect('wss://norma.education-services.ru/orders'));
      });
    } else {
      void dispatch(connect('wss://norma.education-services.ru/orders'));
    }

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
