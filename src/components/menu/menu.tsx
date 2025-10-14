import { Button } from '@krgaa/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';

import type { ReactElement } from 'react';

import styles from './menu.module.css';

export type TMenuItem = {
  id: string;
  type?: string;
  name: string;
  to: string;
};

type TMenuProps = {
  links: TMenuItem[];
  buttons: TMenuItem[];
  onClickButton: (item: TMenuItem) => void;
};

const Menu = ({ links, buttons, onClickButton }: TMenuProps): ReactElement => {
  const location = useLocation();

  return (
    <nav>
      <ul className={styles.menuList}>
        {links.map((item) => (
          <li key={item.id} className={`text text_type_main-medium ${styles.menuItem}`}>
            <NavLink
              to={item.to}
              className={() =>
                location.pathname === item.to
                  ? `${styles.menuItemLink} ${styles.active}`
                  : `${styles.menuItemLink}`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      {buttons.map((btn) => (
        <Button
          key={btn.id}
          htmlType="button"
          type="secondary"
          size="large"
          extraClass={`text text_type_main-medium ${styles.menuItem} ${styles.menuButton}`}
          onClick={() => onClickButton(btn)}
        >
          {btn.name}
        </Button>
      ))}
    </nav>
  );
};

export default Menu;
