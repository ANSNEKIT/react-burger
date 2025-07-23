import type { ReactElement } from 'react';

import styles from './modal-overlay.module.css';

export const ModalOverlay = (): ReactElement => {
  return <div className={styles.shadow}></div>;
};
