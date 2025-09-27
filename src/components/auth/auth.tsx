import type { ReactElement } from 'react';

import styles from './auth.module.css';

type TAuthProps = {
  title: string;
  children: ReactElement;
  links: ReactElement;
};

const Auth = ({ title, children, links }: TAuthProps): ReactElement => {
  return (
    <div className={styles.auth}>
      <h1 className={`text text_type_main-medium ${styles.authTitle} mb-6`}>{title}</h1>
      <form className={styles.form}>{children}</form>
      <div className={`text text_type_main-default ${styles.links}`}>{links}</div>
    </div>
  );
};

export default Auth;
