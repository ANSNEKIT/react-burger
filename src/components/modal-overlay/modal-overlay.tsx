import type { ReactElement } from 'react';

import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClose: () => void;
};
const ModalOverlay = ({ onClose }: TModalOverlayProps): ReactElement => {
  return (
    <div className={styles.shadow} onClick={onClose} data-test-id="modal-overlay"></div>
  );
};

export default ModalOverlay;
