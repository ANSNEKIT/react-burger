import doneStatusImg from '@/images/done.png';
import { getOrder, getBasket, getOrderTotalPrice } from '@/services/basket/selectors';
import { useAppSelector } from '@/services/hooks';
import { useEffect, useState } from 'react';

import { BacketInfo } from '../backet-info/backet-info';
import { BacketItem } from '../backet-item/backet-item';
import { Modal } from '../base-modal/base-modal';
import { OrderDetails } from '../order-details/order-datails';

import type { ReactElement } from 'react';

import orderDetailsStyles from '../order-details/order-details.module.css';
import styles from './burger-constructor.module.css';

type TBurgerConstructorState = {
  isShowBacketInfo: boolean;
  isShowModalOrder: boolean;
};

export const BurgerConstructor = (): ReactElement => {
  const [orderState, setOrderState] = useState<TBurgerConstructorState>({
    isShowBacketInfo: false,
    isShowModalOrder: false,
  });

  const order = useAppSelector(getOrder);
  const basketIngredients = useAppSelector(getBasket);
  const totalPrice = useAppSelector(getOrderTotalPrice);

  useEffect(() => {
    setOrderState((prevState) => ({
      ...prevState,
      isShowBacketInfo: !!order && totalPrice >= 0,
    }));
  }, [totalPrice, order]);

  const onBacketClick = (): void => {
    setOrderState((prevState) => ({
      ...prevState,
      order: { id: 34536 },
      isShowModalOrder: true,
    }));
  };

  const onCloseOrderModal = (): void => {
    setOrderState((prevState) => ({
      ...prevState,
      isShowModalOrder: false,
    }));
  };

  return (
    <section className={styles.burger_constructor}>
      <h2 className="visuallyHidden">Order</h2>

      <div className={`mb-10 ${styles.backetItems}`}>
        {basketIngredients.map((el, idx) => {
          let type: 'top' | 'bottom' | undefined;
          const isTop = idx === 0;
          const isBottom = idx === basketIngredients.length - 1;
          if (isTop) {
            type = 'top';
          } else if (isBottom) {
            type = 'bottom';
          }

          return (
            <BacketItem
              key={el._id}
              item={el}
              type={type}
              isLocked={isTop || isBottom}
              isDraggable={!isTop && !isBottom}
            />
          );
        })}
      </div>

      {orderState.isShowBacketInfo && (
        <BacketInfo totalPrice={totalPrice} onBacketClick={onBacketClick} />
      )}

      {orderState.isShowModalOrder && !!order && (
        <OrderDetails>
          <Modal onClose={onCloseOrderModal}>
            <div className={orderDetailsStyles.innerWrap}>
              <h2 className="mb-8 text text_type_digits-large">{order.number}</h2>
              <p className="mb-15 text text_type_main-medium">Идентификатор заказа</p>
              <img
                src={doneStatusImg}
                className={`mb-15 ${orderDetailsStyles.statusImage}`}
                alt="order status image"
              />
              <p className="mb-2 text text_type_main-default">
                Ваш заказ начали готовить
              </p>
              <p className="text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
              </p>
            </div>
          </Modal>
        </OrderDetails>
      )}
    </section>
  );
};
