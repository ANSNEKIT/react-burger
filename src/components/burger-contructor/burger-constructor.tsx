import doneStatusImg from '@/images/done.png';
import { useEffect, useMemo, useState } from 'react';

import { BacketInfo } from '../backet-info/backet-info';
import { BacketItem } from '../backet-item/backet-item';
import { Modal } from '../base-modal/base-modal';
import { OrderDetails } from '../order-details/order-datails';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TOrder } from '@utils/types';
import type { ReactElement } from 'react';

import orderDetailsStyles from '../order-details/order-details.module.css';
import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredientDTO[];
};

type TBurgerConstructorState = {
  isShowBacketInfo: boolean;
  isShowModalOrder: boolean;
  order: TOrder | null;
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): ReactElement => {
  const [orderState, setOrderState] = useState<TBurgerConstructorState>({
    isShowBacketInfo: false,
    isShowModalOrder: false,
    order: null,
  });

  const totalPrice = useMemo(() => {
    if (!ingredients.length) {
      return 0;
    }

    return ingredients.reduce((acc, el) => (acc += el.price), 0);
  }, [ingredients]);

  useEffect(() => {
    setOrderState((prevState) => ({
      ...prevState,
      isShowBacketInfo: ingredients.length > 0 && totalPrice >= 0,
    }));
  }, [totalPrice, ingredients]);

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
        {ingredients.map((el, idx) => {
          let type: 'top' | 'bottom' | undefined;
          const isTop = idx === 0;
          const isBottom = idx === ingredients.length - 1;
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

      {orderState.isShowModalOrder && orderState.order && (
        <OrderDetails>
          <Modal onClose={onCloseOrderModal}>
            <div className={orderDetailsStyles.innerWrap}>
              <h2 className="mb-8 text text_type_digits-large">{orderState.order.id}</h2>
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
