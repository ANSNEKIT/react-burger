import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';

import type { JSX, MouseEventHandler } from 'react';

import styles from './modal.module.css';

type TBaseModalProps = {
  title?: string;
  children: JSX.Element;
  onClose: () => void;
};

const Modal = ({ title, children, onClose }: TBaseModalProps): JSX.Element => {
  const onCloseLocal: MouseEventHandler<HTMLElement> = (evt) => {
    const target = evt.target as HTMLElement;

    if (target.closest('#modalContent') && target.dataset.id !== 'modalClose') {
      if (target.closest('[data-id="modalClose"]')) {
        onClose();
      }
      return;
    }

    onClose();
  };

  return (
    <div className={styles.modal} onClick={onCloseLocal}>
      <div className={styles.shadow}></div>

      <div id="modalContent" className={styles.content}>
        <div className={styles.modalHeader}>
          {title && (
            <h3 className={`${styles.modalTitle} text_type_main-large`}>{title}</h3>
          )}
          <button
            data-id="modalClose"
            type="button"
            className={styles.modalClose}
            onClick={onCloseLocal}
          >
            <CloseIcon type="primary" />
          </button>
        </div>

        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
