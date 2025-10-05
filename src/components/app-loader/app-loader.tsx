import type { ReactElement } from 'react';

import styles from './app-loader.module.css';

type TLoaderProps = {
  size?: 'small' | 'medium' | 'large';
  extraClasses?: string;
};

const Loader = ({ size = 'medium', extraClasses = '' }: TLoaderProps): ReactElement => {
  return (
    <div className={`${styles.loader} ${styles[size]} ${extraClasses}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
