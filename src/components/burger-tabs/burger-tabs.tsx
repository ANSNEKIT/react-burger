import { EIngredientType, EIngredientTypeTitles } from '@/utils/types';
import { Tab } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredientType } from '@/utils/types';
import type { ReactElement } from 'react';

import styles from './burger-tabs.module.css';

type TBurgerTabsProps = {
  activeTab: TIngredientType;
  onClickTab: (tab: TIngredientType) => void;
};

export const BurgerTabs = ({
  activeTab,
  onClickTab,
}: TBurgerTabsProps): ReactElement => {
  return (
    <ul className={styles.menu}>
      <li className={styles.menuItem}>
        <Tab
          value="bun"
          active={activeTab === EIngredientType.bun}
          onClick={() => onClickTab('bun')}
        >
          {EIngredientTypeTitles.bun}
        </Tab>
      </li>
      <li className={styles.menuItem}>
        <Tab
          value="main"
          active={activeTab === EIngredientType.main}
          onClick={() => onClickTab('main')}
        >
          {EIngredientTypeTitles.main}
        </Tab>
      </li>
      <li className={styles.menuItem}>
        <Tab
          value="sauce"
          active={activeTab === EIngredientType.sauce}
          onClick={() => onClickTab('sauce')}
        >
          {EIngredientTypeTitles.sauce}
        </Tab>
      </li>
    </ul>
  );
};
