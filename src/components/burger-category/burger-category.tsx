import { Ingredient } from '@/components';
import { Link, useLocation } from 'react-router-dom';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { ReactElement } from 'react';

import styles from './burger-category.module.css';

type TBurgerCategoryProps = {
  title: string;
  ingredients: TIngredientDTO[];
};

const BurgerCategory = ({ title, ingredients }: TBurgerCategoryProps): ReactElement => {
  const location = useLocation();
  return (
    <div>
      <h2 className={'mb-6 text text_type_main-medium'}>{title}</h2>
      <div className={styles.ingredients}>
        {ingredients.map((ing) => (
          <Link
            key={ing._id}
            to={`/ingredients/${ing._id}`}
            state={{ background: { pathname: location.pathname } }}
            className={styles.link}
          >
            <Ingredient ingredient={ing} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BurgerCategory;
