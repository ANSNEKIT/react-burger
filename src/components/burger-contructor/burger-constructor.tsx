import { useEffect, useMemo, useState } from 'react';

import { BacketInfo } from '../backet-info/backet-info';
import { BacketItem } from '../backet-item/backet-item';

import type { TIngredient } from '@utils/types';
import type { ReactElement } from 'react';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): ReactElement => {
  console.log(ingredients);

  const [isShowBacketInfo, setIsShowBacketInfo] = useState(false);

  const totalPrice = useMemo(() => {
    if (!ingredients.length) {
      return 0;
    }

    return ingredients.reduce((acc, el) => (acc += el.price), 0);
  }, [ingredients]);

  useEffect(() => {
    setIsShowBacketInfo(ingredients.length > 0 && totalPrice >= 0);
  }, [totalPrice, ingredients]);

  const onBacketClick = (): void => {
    console.log('onBacketClick');
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

      {isShowBacketInfo && (
        <BacketInfo totalPrice={totalPrice} onBacketClick={onBacketClick} />
      )}
    </section>
  );
};
