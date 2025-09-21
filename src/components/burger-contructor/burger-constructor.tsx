import doneStatusImg from '@/images/done.png';
import { createOrder } from '@/services/basket/actions';
import {
  addIngredient,
  clearBasket,
  removeIngredient,
  setBun,
} from '@/services/basket/reducer';
import {
  getOrder,
  getBasketBun,
  getBasketIngredients,
} from '@/services/basket/selectors';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { EIngredientType } from '@/utils/types';
import { useMemo, useRef } from 'react';
import { useDrop } from 'react-dnd';

import { BacketInfo } from '../backet-info/backet-info';
import { BacketItem } from '../backet-item/backet-item';
import { Modal } from '../base-modal/base-modal';
import { OrderDetails } from '../order-details/order-datails';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { ReactElement } from 'react';

import orderDetailsStyles from '../order-details/order-details.module.css';
import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): ReactElement => {
  const order = useAppSelector(getOrder);
  const basketIngredients = useAppSelector(getBasketIngredients);
  const basketBun = useAppSelector(getBasketBun);
  const dropTargetRef = useRef(null);
  const dispatch = useAppDispatch();

  const totalPrice = useMemo(() => {
    const totalBunPrice = (basketBun?.price ?? 0) * 2;
    const totalIngredientsPrice = basketIngredients.reduce(
      (acc, el) => (acc += el.price),
      0
    );
    return totalBunPrice + totalIngredientsPrice;
  }, [basketBun, basketIngredients]);

  const isShowTotal = useMemo(
    () => basketIngredients.length > 0 || !!basketBun,
    [basketBun, basketIngredients]
  );

  const isDisabledSubmit = useMemo(
    () => basketIngredients.length === 0 || !basketBun,
    [basketBun, basketIngredients]
  );

  const isShowModalOrder = useMemo(() => order?.number, [order]);

  const onBacketClick = (): void => {
    if (!basketBun) {
      return;
    }
    const orderPayload = {
      ingredients: [basketBun._id, ...basketIngredients.map((el) => el._id)],
    };

    void dispatch(createOrder(orderPayload));
  };

  const onCloseOrderModal = (): void => {
    dispatch(clearBasket());
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

      {isShowTotal && (
        <BacketInfo
          totalPrice={totalPrice}
          isDisabledSubmit={isDisabledSubmit}
          onBacketClick={onBacketClick}
        />
      )}

      {isShowModalOrder && order?.number && (
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
