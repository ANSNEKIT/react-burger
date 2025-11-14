import { getGlobalOrder } from '@/services/common/selectors';
import { loadFeed } from '@/services/feed/actions';
import { getFeed } from '@/services/feed/selectors';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { getIngredientsState } from '@/services/ingredients/selectors';
import { loadOrder } from '@/services/profile-orders/actions';
import { getOrder } from '@/services/profile-orders/selectors';
import { EOrderStatusTitles } from '@/types/enums';
import { convertIdsToIngredients } from '@/utils/convert-ids-to-ingredients';
import { convertToQniqIngredients } from '@/utils/convert-to-qniq-ingredients';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useMemo, useState, type ReactElement } from 'react';

import IngredientRow from '../ingredient-row/ingredient-row';
import Loader from '../loader/loader';

import styles from './order-item.module.css';

type TOrderProps = {
  itemNumber: string;
  extraClass?: string;
  isOrderItem?: boolean;
};

const OrderItem = ({
  extraClass,
  isOrderItem,
  itemNumber,
}: TOrderProps): ReactElement => {
  const dispatch = useAppDispatch();
  const { mapIngredients } = useAppSelector(getIngredientsState);
  const item = useAppSelector(getGlobalOrder);
  const feed = useAppSelector((store) => getFeed(store, itemNumber));
  const order = useAppSelector((store) => getOrder(store, itemNumber));

  const [isLoading, setIsLoading] = useState(true);

  const resultItem = useMemo(() => {
    if (item) {
      return item;
    }
    if (isOrderItem) {
      return order;
    }
    return feed;
  }, [item, feed, order]);

  const itemIngredients = useMemo(() => {
    if (!resultItem) {
      return [];
    }

    const mappedIngredients = new Map(mapIngredients);
    const orderIngs = convertIdsToIngredients(resultItem.ingredients, mappedIngredients);
    const qniqOrderIngs = convertToQniqIngredients(orderIngs);

    return qniqOrderIngs;
  }, [resultItem, mapIngredients]);

  useEffect(() => {
    if (resultItem) {
      setIsLoading(false);
    } else if (isOrderItem) {
      void dispatch(loadOrder({ orderId: itemNumber })).finally(() =>
        setIsLoading(false)
      );
    } else {
      void dispatch(loadFeed({ orderId: itemNumber })).finally(() =>
        setIsLoading(false)
      );
    }
  }, [resultItem]);

  const ingsPrice = itemIngredients.reduce(
    (acc, ing) => (acc += ing.price * (ing?.count ?? 1)),
    0
  );

  if (isLoading && !resultItem) {
    return (
      <div className={`${styles.feedItem} ${extraClass ?? ''}`}>
        <Loader size="large" />
      </div>
    );
  }

  if (!resultItem) {
    return (
      <div className={`${styles.feedItem} ${extraClass ?? ''}`}>
        <h2 className="text-center text text_type_main-medium mb-10">Не найден заказ</h2>
      </div>
    );
  }

  return (
    <div className={`${styles.feedItem} ${extraClass ?? ''}`}>
      <div className="mb-15">
        <h1 className="text text_type_main-medium mb-3">{resultItem.name}</h1>
        <div className={`${styles.orderStatus} text text_type_main-default`}>
          {EOrderStatusTitles[resultItem.status]}
        </div>
      </div>

      <div className={`${styles.feedIngredientsBlock} mb-10`}>
        <h2 className="text text_type_main-medium mb-6">Состав:</h2>
        <div className={styles.feedIngredients}>
          {itemIngredients.map((ing) => (
            <IngredientRow key={ing._id} ingredient={ing} />
          ))}
        </div>
      </div>

      <div className={styles.feedFooter}>
        <div className="">
          <FormattedDate
            date={new Date(resultItem.createdAt)}
            className="text_color_inactive"
          />
        </div>
        <div className="d-flex align-center">
          <p className="text text_type_digits-default mr-2">{ingsPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
