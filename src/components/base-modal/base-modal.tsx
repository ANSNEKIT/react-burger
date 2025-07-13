import { ModalOverlay } from '@/components/modal-overlay/modal-overlay';
import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, type JSX, type MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';

import styles from './base-modal.module.css';

type TBaseModalProps = {
  title?: string;
  children: JSX.Element;
  onClose: () => void;
};

const Modal = ({ title, children, onClose }: TBaseModalProps): JSX.Element => {
  const modalRoot: Element | null = document.getElementById('modal-root');

  if (!modalRoot) {
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
  }, [onClose]);

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

  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={onCloseLocal}>
      <ModalOverlay />

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
    </div>,
    modalRoot!
  );
};

export default Modal;
