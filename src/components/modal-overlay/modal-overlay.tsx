import type { ReactElement } from 'react';

import styles from './modal-overlay.module.css';

const ModalOverlay = (): ReactElement => {
  return <div className={styles.shadow}></div>;
};

export default ModalOverlay;
