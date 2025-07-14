import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { ReactElement } from 'react';

import styles from './backet-item.module.css';

export type IBacketItemProps = {
  item: TIngredientDTO;
  isDraggable: boolean;
  isLocked: boolean;
  type?: 'top' | 'bottom';
};

export const BacketItem = ({
  item,
  type,
  isDraggable,
  isLocked,
}: IBacketItemProps): ReactElement => {
  return (
    <div className={styles.backetItem}>
      <div className={styles.dragBlock}>
        {isDraggable && <DragIcon type="primary" />}
      </div>
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
      />
    </div>
  );
};
