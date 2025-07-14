import Modal from '@/components/base-modal/base-modal';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { ReactElement } from 'react';

import styles from './ingredient-details.module.css';

export type TComposition = {
  name: string;
  value: number;
};

export type TIngredientDetailModalProps = {
  detail: TIngredientDTO;
  onClose: () => void;
};

export const IngredientDetails = ({
  detail,
  onClose,
}: TIngredientDetailModalProps): ReactElement => {
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
    <Modal title="Детали ингредиента" onClose={onClose}>
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
    </Modal>
  );
};
