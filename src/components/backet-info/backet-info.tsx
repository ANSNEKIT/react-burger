import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { ReactElement } from 'react';

import styles from './backet-info.module.css';

export type TBacketInfoProps = {
  isDisabled?: boolean;
  totalPrice: number;
  onBacketClick: () => void;
};

export const BacketInfo = ({
  totalPrice,
  isDisabled = false,
  onBacketClick,
}: TBacketInfoProps): ReactElement => {
  return (
    <div className={`${styles.backetInfo}`}>
      {totalPrice !== null && (
        <div className={styles.totalPrice}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      )}
      <Button
        type="primary"
        size="large"
        htmlType="button"
        onClick={onBacketClick}
        disabled={isDisabled}
      >
        Оформить заказ
      </Button>
    </div>
  );
};
