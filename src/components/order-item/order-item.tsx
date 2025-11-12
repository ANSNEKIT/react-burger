import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';

import IngredientRow from '../ingredient-row/ingredient-row';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TOrderDTO } from '@/contracts/orderDTO';
import type { ReactElement } from 'react';

import styles from './order-item.module.css';

type TOrderProps = {
  item: TOrderDTO;
  itemIngredients: TIngredientDTO[];
};

const OrderItem = ({ item, itemIngredients }: TOrderProps): ReactElement => {
  const ingsPrice = itemIngredients.reduce(
    (acc, ing) => (acc += ing.price * (ing?.count ?? 1)),
    0
  );
  return (
    <div className={`${styles.feedItem}`}>
      <h2 className="text-center text text_type_digits-default mb-10">#{item.number}</h2>

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
