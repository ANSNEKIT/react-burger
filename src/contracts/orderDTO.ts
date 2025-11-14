import type { EOrderStatus } from '@/types/enums';

export type TOrderDTO = {
  ingredients: string[];
  _id: string;
  name: string;
  status: EOrderStatus;
  number: number;
  createdAt: string;
  updatedAt: string;
  owner?: string;
};

export type TAllOrders = {
  success: boolean;
  orders: TOrderDTO[];
  total: number;
  totalToday: number;
};
