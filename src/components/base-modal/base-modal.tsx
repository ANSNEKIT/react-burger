import { ModalOverlay } from '@/components';
import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, type ReactElement, type JSX } from 'react';
import ReactDOM from 'react-dom';

import styles from './base-modal.module.css';

type TBaseModalProps = {
  title?: string;
  children: JSX.Element;
  onClose: () => void;
};

const Modal = ({ title, children, onClose }: TBaseModalProps): ReactElement => {
  const modalRootEl: HTMLElement | null = document.getElementById('modal-root');

  if (!modalRootEl) {
    const el = document.createElement('div');
    el.id = 'modal-root';
    document.body.appendChild(el);
  }

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent): void => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return (): void => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalRootEl, onClose]);

  const BaseModal = (
    <div className={styles.modal}>
      <ModalOverlay onClose={onClose} />

      <div id="modalContent" className={styles.content} data-test-id="modal-content">
        <div className={styles.modalHeader}>
          <h3 className={`${styles.modalTitle} text_type_main-large`}>{title}</h3>
          <button
            data-id="modalClose"
            data-test-id="modal-close-btn"
            type="button"
            className={styles.modalClose}
            onClick={onClose}
          >
            <CloseIcon type="primary" />
          </button>
        </div>

        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );

  return <>{modalRootEl && ReactDOM.createPortal(BaseModal, modalRootEl)}</>;
};

export default Modal;
