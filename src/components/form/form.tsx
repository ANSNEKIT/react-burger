import type { ReactElement } from 'react';

import styles from './form.module.css';

type TAuthProps = {
  title?: string;
  children: ReactElement;
  links?: ReactElement;
};

const Form = ({ title, children, links }: TAuthProps): ReactElement => {
  return (
    <div className={styles.formWrap}>
      {title && (
        <h1 className={`text text_type_main-medium ${styles.formTitle} mb-6`}>
          {title}
        </h1>
      )}
      <form className={styles.form}>{children}</form>
      {links && (
        <div className={`text text_type_main-default ${styles.links}`}>{links}</div>
      )}
    </div>
  );
};

export default Form;
