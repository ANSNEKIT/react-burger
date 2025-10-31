import { moveIngredient } from '@/services/basket/reducer';
import { useAppDispatch } from '@/services/hooks';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useRef, type ReactElement } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TDragItem } from '@/types/types';

import styles from './backet-item.module.css';

export type TBacketItemProps = {
  index?: number;
  item: TIngredientDTO;
  isDraggable: boolean;
  isLocked: boolean;
  type?: 'top' | 'bottom';
  onDelete?: (id: string) => void;
};

const BacketItem = ({
  index = -1,
  item,
  type,
  isDraggable,
  isLocked,
  onDelete,
}: TBacketItemProps): ReactElement => {
  const basketItemRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  const bunText = useMemo(() => {
    if (!type) {
      return '';
    }
    return type === 'top' ? '(верх)' : '(низ)';
  }, [type]);

  const [{ isDragging }, drag] = useDrag<TDragItem, unknown, { isDragging: boolean }>({
    type: 'basket-item',
    item: { id: item._id, index, ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    isDragging: (monitor) => {
      return monitor.getItem().id === item._id;
    },
    end(_, monitor) {
      if (!monitor.didDrop()) {
        return;
      }
    },
  });

  const [_, drop] = useDrop<TDragItem, unknown, unknown>({
    accept: 'basket-item',
    hover(item: TDragItem, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (!basketItemRef.current || dragIndex === hoverIndex) {
        return;
      }

      const { top, bottom } = basketItemRef.current.getBoundingClientRect();
      const clientOffsetY = monitor.getClientOffset()?.y ?? 0;
      const hoverMiddleY = (bottom - top) / 2;
      const hoverClientY = clientOffsetY - top;

      // Если навели на булку
      if (hoverIndex === -1) {
        return;
      }

      // Перетаскиваем вниз
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Перетаскиваем вверх
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveIngredient({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  drag(drop(basketItemRef));

  const styleDraging = { opacity: isDragging ? 0.25 : 1 };

  return (
    <div ref={basketItemRef} className={styles.backetItem} style={styleDraging}>
      <div className={styles.dragBlock}>
        {isDraggable && <DragIcon type="primary" />}
      </div>
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={bunText ? `${item.name} ${bunText}` : item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => (!isLocked && onDelete ? onDelete(item._id) : undefined)}
      />
    </div>
  );
};

export default BacketItem;
