import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useRef, type ReactElement } from 'react';
import { useDrag } from 'react-dnd';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';

import styles from './ingredient.module.css';

type TIngredientProps = {
  ingredient: TIngredientDTO;
  onClickCb: () => void;
};

type TDragItem = {
  id: string;
};

export const Ingredient = ({
  ingredient,
  onClickCb,
}: TIngredientProps): ReactElement => {
  const [{ isDragging }, drag] = useDrag<TDragItem, void, { isDragging: boolean }>({
    type: 'ingredient',
    item: { id: ingredient._id, ...ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const ingredientRef = useRef(null);
  const ingredientClasses = `${styles.ingredient} ${isDragging ? 'styles.dragging' : ''}`;
  drag(ingredientRef);

  return (
    <div ref={ingredientRef} className={ingredientClasses} onClick={onClickCb}>
      <picture>
        <source
          media="(max-width: 600px)"
          srcSet={ingredient.image_mobile}
          type="image/png"
        />
        <source media="(max-width: 1200px)" srcSet={ingredient.image} type="image/png" />
        <img
          src={ingredient.image_large}
          className={`mr-4 ml-4 mb-1 ${styles.ingredientImage}`}
          alt={ingredient.name}
        />
      </picture>

      <div className={`mb-1 text text_type_main-medium ${styles.ingredientPrice}`}>
        {ingredient.price} <CurrencyIcon type="primary" />
      </div>
      <div className={`text text_type_main-default ${styles.ingredientName}`}>
        {ingredient.name}
      </div>
      {ingredient?.count && ingredient.count > 0 && (
        <Counter count={ingredient.count} size="default" extraClass="m-1" />
      )}
    </div>
  );
};
