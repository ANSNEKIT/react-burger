import { useEffect, useMemo, useState } from 'react';

import { BacketInfo } from '../backet-info/backet-info';
import { BacketItem } from '../backet-item/backet-item';
import { OrderDetails } from '../order-details/order-datails';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TOrder } from '@utils/types';
import type { ReactElement } from 'react';

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
  console.log(ingredients);

  const [state, setState] = useState<TBurgerConstructorState>({
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
    setState((prevState) => ({
      ...prevState,
      isShowBacketInfo: ingredients.length > 0 && totalPrice >= 0,
    }));
  }, [totalPrice, ingredients]);

  const onBacketClick = (): void => {
    console.log('onBacketClick');

    setState((prevState) => ({
      ...prevState,
      order: { id: 34536 },
      isShowModalOrder: true,
    }));
  };

  const onCloseOrderModal = (): void => {
    console.log('close order modal');
    setState((prevState) => ({
      ...prevState,
      isShowModalOrder: false,
    }));
  };

  return (
    <section className={styles.burger_constructor}>
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

      {state.isShowBacketInfo && (
        <BacketInfo totalPrice={totalPrice} onBacketClick={onBacketClick} />
      )}

      {state.isShowModalOrder && state.order && (
        <OrderDetails order={state.order} onClose={onCloseOrderModal} />
      )}
    </section>
  );
};
