import Loader from '@/components/loader/loader';

import type { ReactElement } from 'react';

import styles from './form.module.css';

type TAuthProps = {
  children: ReactElement;
  title?: string;
  links?: ReactElement;
  error?: string | null;
  isLoading?: boolean;
};

const Form = ({
  title,
  children,
  links,
  isLoading,
  error,
}: TAuthProps): ReactElement => {
  return (
    <div className={styles.formWrap}>
      {title && (
        <h1 className={`text text_type_main-medium ${styles.formTitle} mb-6`}>
          {title}
        </h1>
      )}
      <form className={styles.form}>{children}</form>
      <h3 className={`${styles.formError} mt-2 mb-2`}>
        <p className={`text text_type_main-default`}>{error}</p>
      </h3>
      {isLoading && (
        <div className={styles.formLoader}>
          <p>Загрузка...</p>
          <Loader size="small" />
        </div>
      )}
      {links && (
        <div className={`text text_type_main-default ${styles.links}`}>{links}</div>
      )}
    </div>
  );
};

export default Form;
