import doneStatusImg from '@/images/done.png';

import Modal from '@components/base/modal/modal';

import type { TOrder } from '@/utils/types';
import type { ReactElement } from 'react';

import styles from './order-modal.module.css';

export type TOrderModalProps = {
  order: TOrder;
  onClose: () => void;
};

export const OrderModal = ({ order, onClose }: TOrderModalProps): ReactElement => {
  return (
    <Modal onClose={onClose}>
      <div className={styles.innerWrap}>
        <h2 className="mb-8 text text_type_digits-large">{order.id}</h2>
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
    </Modal>
  );
};
