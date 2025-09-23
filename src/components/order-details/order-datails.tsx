import doneStatusImg from '@/images/done.png';

import type { ReactElement } from 'react';

import orderDetailsStyles from './order-details.module.css';

export type TOrderModalProps = {
  orderNumber: number;
};

export const OrderDetails = ({ orderNumber }: TOrderModalProps): ReactElement => {
  return (
    <div className={orderDetailsStyles.innerWrap}>
      <h2 className="mb-8 text text_type_digits-large">{orderNumber}</h2>
      <p className="mb-15 text text_type_main-medium">Идентификатор заказа</p>
      <img
        src={doneStatusImg}
        className={`mb-15 ${orderDetailsStyles.statusImage}`}
        alt="order status image"
      />
      <p className="mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
