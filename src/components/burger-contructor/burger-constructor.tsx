import doneStatusImg from '@/images/done.png';
import { addIngredient, removeIngredient, setBun } from '@/services/basket/reducer';
import {
  getOrder,
  getBasketBun,
  getBasketIngredients,
} from '@/services/basket/selectors';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { EIngredientType } from '@/utils/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';

import { BacketInfo } from '../backet-info/backet-info';
import { BacketItem } from '../backet-item/backet-item';
import { Modal } from '../base-modal/base-modal';
import { OrderDetails } from '../order-details/order-datails';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
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
  const basketIngredients = useAppSelector(getBasketIngredients);
  const basketBun = useAppSelector(getBasketBun);
  const dropTargetRef = useRef(null);
  const dispatch = useAppDispatch();

  const totalPrice = useMemo(() => {
    return basketIngredients.reduce((acc, el) => (acc += el.price), 0);
  }, [basketIngredients]);

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

  const onDeleteBasketItem = (id: string): void => {
    dispatch(removeIngredient(id));
  };

  const onIngredientDrop = (item: TIngredientDTO): void => {
    if (item.type === EIngredientType.bun) {
      if (basketBun?._id === item._id) {
        return;
      }
      dispatch(setBun({ ...item, id: crypto.randomUUID() }));
    } else {
      dispatch(addIngredient({ ...item, id: crypto.randomUUID() }));
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'ingredient',
    drop: onIngredientDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  drop(dropTargetRef);

  const burgerConstructorClasses = `${styles.burger_constructor} ${isOver ? styles.dropTarget : ''}`;

  return (
    <section ref={dropTargetRef} className={burgerConstructorClasses}>
      <h2 className="visuallyHidden">Order</h2>

      <div className={`mb-10 ${styles.backetItems}`}>
        {basketBun && (
          <BacketItem item={basketBun} type="top" isLocked={true} isDraggable={false} />
        )}

        {basketIngredients.map((el) => {
          return (
            <BacketItem
              key={el.id}
              item={el}
              isLocked={false}
              isDraggable={true}
              onDelete={onDeleteBasketItem}
            />
          );
        })}

        {basketBun && (
          <BacketItem
            item={basketBun}
            type="bottom"
            isLocked={true}
            isDraggable={false}
          />
        )}
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
