import { getGlobalOrder } from '@/services/common/selectors';
import { useAppSelector } from '@/services/hooks';
import { getIngredientsState } from '@/services/ingredients/selectors';
import { convertIdsToIngredients } from '@/utils/convert-ids-to-ingredients';
import { convertToQniqIngredients } from '@/utils/convert-to-qniq-ingredients';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo, type ReactElement } from 'react';

import IngredientRow from '../ingredient-row/ingredient-row';

import styles from './order-item.module.css';

type TOrderProps = {
  number: string;
  extraClass?: string;
};

const OrderItem = ({ number, extraClass }: TOrderProps): ReactElement => {
  const { mapIngredients } = useAppSelector(getIngredientsState);
  const item = useAppSelector((state) => getGlobalOrder(state, number));
  const itemIngredients = useMemo(() => {
    if (!item) {
      return [];
    }
    const mappedIngredients = new Map(mapIngredients);
    const orderIngs = convertIdsToIngredients(item.ingredients, mappedIngredients);
    const qniqOrderIngs = convertToQniqIngredients(orderIngs);
    return qniqOrderIngs;
  }, [item, mapIngredients]);

  const ingsPrice = itemIngredients.reduce(
    (acc, ing) => (acc += ing.price * (ing?.count ?? 1)),
    0
  );

  if (!item) {
    return (
      <div className={`${styles.feedItem}`}>
        <h2 className="text-center text text_type_main-medium mb-10">Не найден заказ</h2>
      </div>
    );
  }

  return (
    <div className={`${styles.feedItem} ${extraClass ?? ''}`}>
      <div className="mb-15">
        <h1 className="text text_type_main-medium mb-3">{item.name}</h1>
        <div className={`${styles.orderStatus} text text_type_main-default`}>
          {item.status === 'done' ? 'Выполнен' : 'В работе'}
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
            date={new Date(item.createdAt)}
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
