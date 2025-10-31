import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { setCurrentIngredient } from '@/services/ingredients/reducer';
import { getCurrentIngredient } from '@/services/ingredients/selectors';
import { useEffect, type ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ingredient-details.module.css';

export type TComposition = {
  name: string;
  value: number;
};

const IngredientDetails = (): ReactElement => {
  const { id } = useParams<string>();
  const dispatch = useAppDispatch();
  const detail = useAppSelector(getCurrentIngredient);

  useEffect(() => {
    if (id) {
      dispatch(setCurrentIngredient(id));
    }
  }, [id, dispatch]);

  if (!detail) {
    return <div>Не найден элемент id: {id}</div>;
  }

  const compositions = [
    {
      name: 'Калории, ккал',
      value: detail.calories,
    },
    {
      name: 'Белки, г',
      value: detail.proteins,
    },
    {
      name: 'Жиры, г',
      value: detail.fat,
    },
    {
      name: 'Углеводы, г',
      value: detail.carbohydrates,
    },
  ];

  return (
    <div className={styles.innerWrap}>
      <img
        src={detail.image_large}
        className={`mb-4 ${styles.ingredientImage}`}
        alt={detail.name}
      />
      <div className={`text text_type_main-medium mb-8 ${styles.ingredientName}`}>
        {detail.name}
      </div>
      <div className={styles.compositions}>
        {compositions.map((composition, index) => (
          <div key={index} className={styles.composition}>
            <div className="mb-2 text text_type_main-small text_color_inactive">
              {composition.name}
            </div>
            <div className="text text_type_digits-default text_color_inactive">
              {composition.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientDetails;
