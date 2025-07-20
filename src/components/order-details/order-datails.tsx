import type { ReactElement } from 'react';

export type TOrderModalProps = {
  children: ReactElement;
};

export const OrderDetails = ({ children }: TOrderModalProps): ReactElement => {
  return <>{children}</>;
};
