import { ModalOverlay } from '@/components';
import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, type ReactElement, type JSX, type MouseEventHandler } from 'react';
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

  const onCloseLocal: MouseEventHandler<HTMLElement> = (evt) => {
    const target = evt.target as HTMLElement;

    if (target.closest('#modalContent') && target.dataset.id !== 'modalClose') {
      if (target.closest('[data-id="modalClose"]')) {
        evt.stopPropagation();
        onClose();
        return;
      }
    }

    onClose();
  };

  const BaseModal = (
    <div className={styles.modal} onClick={onCloseLocal}>
      <ModalOverlay />

      <div id="modalContent" className={styles.content}>
        <div className={styles.modalHeader}>
          <h3 className={`${styles.modalTitle} text_type_main-large`}>{title}</h3>
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

  return <>{modalRootEl && ReactDOM.createPortal(BaseModal, modalRootEl)}</>;
};

export default Modal;
