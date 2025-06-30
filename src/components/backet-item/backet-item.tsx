import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';
import type { ReactElement } from 'react';

import styles from './backet-item.module.css';

export type IBacketItemProps = {
  item: TIngredient;
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
