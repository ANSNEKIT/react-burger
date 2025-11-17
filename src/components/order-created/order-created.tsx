import Loader from '@/components/loader/loader';
import doneStatusImg from '@/images/done.png';

import type { ReactElement } from 'react';

import styles from './order-created.module.css';

export type TOrderModalProps = {
  orderNumber: number | null;
  isLoading: boolean;
};

const OrderCreated = ({ orderNumber, isLoading }: TOrderModalProps): ReactElement => {
  return (
    <div className={styles.innerWrap}>
      {isLoading && (
        <div className={styles.orderInfo}>
          <div className="mb-10 mt-10">
            <Loader size="medium" />
          </div>
          <p className="mb-2 text text_type_main-default">Заказ создается...</p>
        </div>
      )}

      {orderNumber && (
        <div className={styles.orderInfo}>
          <h2 className="mb-8 text text_type_digits-large">{orderNumber}</h2>
          <p className="mb-15 text text_type_main-medium">Идентификатор заказа</p>
          <img
            src={doneStatusImg}
            className={`mb-15 ${styles.statusImage}`}
            alt="order status image"
          />
          <p className="mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderCreated;
