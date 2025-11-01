import { useMemo, type ReactElement } from 'react';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';

import styles from './ingredient-preview.module.css';

type TIngredientPreviewProps = {
  ingredients: TIngredientDTO[];
  showLength?: number;
};

const IngredientPreview = ({
  ingredients,
  showLength,
}: TIngredientPreviewProps): ReactElement => {
  const SHOW_LENGTH = showLength ?? 5;
  const overCount = ingredients.length - SHOW_LENGTH;

  const previews = useMemo(
    () => ingredients.map((ing) => ing.image_mobile).slice(0, SHOW_LENGTH),
    [ingredients]
  );
  return (
    <div className={styles.previewRoot}>
      {previews.map((ingSrc, index) => (
        <div
          key={index}
          className={styles.ingredientItem}
          style={{ zIndex: previews.length - index }}
        >
          <img
            src={ingSrc}
            className={`${styles.ingredientImage}`}
            alt={ingredients[index].name}
          />
        </div>
      ))}
      {overCount > 0 && (
        <div className={`${styles.ingredientItem} ${styles.overPreview}`}>
          <div className={`${styles.overPreviewCount} text text_type_digits-default`}>
            +{overCount}
          </div>
          <img
            src={ingredients[SHOW_LENGTH + 1].image_mobile}
            className={`${styles.ingredientImage}`}
            alt={ingredients[SHOW_LENGTH + 1].name}
          />
        </div>
      )}
    </div>
  );
};

export default IngredientPreview;
