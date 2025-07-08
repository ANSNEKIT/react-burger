import Modal from '@components/base/modal/modal';

import type { TIngredient } from '@/utils/types';
import type { ReactElement } from 'react';

import styles from './ingredient-detail-modal.module.css';

export type TComposition = {
  name: string;
  value: number;
};

export type TIngredientDetailModalProps = {
  detail: TIngredient;
  onClose: () => void;
};

export const IngredientDetailModal = ({
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
