import { BacketInfo, BacketItem, Modal, OrderDetails, Loader } from '@/components';
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
  getIsLoadingOrder,
} from '@/services/basket/selectors';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { getUser } from '@/services/user/selectors';
import { EIngredientType } from '@/types/enums';
import { useMemo, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TDragItem } from '@/types/types';
import type { ReactElement } from 'react';

import styles from './burger-constructor.module.css';

const BurgerConstructor = (): ReactElement => {
  const dropTargetRef = useRef<HTMLElement | null>(null);
  const order = useAppSelector(getOrder);
  const user = useAppSelector(getUser);
  const basketIngredients = useAppSelector(getBasketIngredients);
  const basketBun = useAppSelector(getBasketBun);
  const isLoadingOrder = useAppSelector(getIsLoadingOrder);
  const navigate = useNavigate();
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
    () => basketIngredients.length === 0 || !basketBun || isLoadingOrder,
    [basketBun, basketIngredients, isLoadingOrder]
  );

  const isShowModalOrder = useMemo(
    () => isLoadingOrder || order?.number,
    [isLoadingOrder, order]
  );

  const onCreateOrder = (): void => {
    if (!basketBun) {
      return;
    }

    if (!user) {
      void navigate('/login');
      return;
    }

    const orderPayload = {
      ingredients: [basketBun._id, ...basketIngredients.map((el) => el._id)],
    };

    void dispatch(createOrder(orderPayload));
  };

  const onCloseOrderModal = (): void => {
    if (isLoadingOrder) {
      return;
    }
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

  const [{ isOver }, drop] = useDrop<TDragItem, unknown, { isOver: boolean }>({
    accept: 'ingredient',
    drop: onIngredientDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  drop(dropTargetRef);

  const burgerConstructorClasses = `${styles.burgerConstructor} ${isOver ? styles.dropTarget : ''}`;

  return (
    <section ref={dropTargetRef} className={burgerConstructorClasses}>
      <h2 className="visuallyHidden">Order</h2>

      <div className={`mb-10 ${styles.backetItems}`}>
        {basketBun && (
          <BacketItem item={basketBun} type="top" isLocked={true} isDraggable={false} />
        )}

        {basketIngredients.map((el, index) => {
          return (
            <BacketItem
              key={el.id}
              item={el}
              index={index}
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

      {isLoadingOrder && (
        <div className="d-flex justify-center">
          <Loader size="medium" />
        </div>
      )}

      {isShowTotal && (
        <BacketInfo
          totalPrice={totalPrice}
          isDisabledSubmit={isDisabledSubmit}
          onBacketClick={onCreateOrder}
        />
      )}

      {isShowModalOrder && (
        <Modal onClose={onCloseOrderModal}>
          <OrderDetails orderNumber={order?.number ?? null} isLoading={isLoadingOrder} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
