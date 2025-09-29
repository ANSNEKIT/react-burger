import type { ReactElement } from 'react';

import styles from './menu.module.css';

type TMenuItem = {
  id: string;
  name: string;
  to: string;
};

type TMenuProps = {
  items: TMenuItem[];
};

const Menu = ({ items }: TMenuProps): ReactElement => {
  return (
    <ul className={styles.menuList}>
      {items.map((item) => (
        <li key={item.id} className={`text text_type_main-medium ${styles.menuItem}`}>
          <a href={item.to} className={styles.menuItemLink}>
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
