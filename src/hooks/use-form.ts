import React from 'react';

import type { ChangeEvent } from 'react';

export type FormEvent<T> = (e: ChangeEvent<T>) => void;
export type SetFormEvent<T> = (val: React.SetStateAction<T>) => void;

export const useForm = <T extends Record<string, string>>(
  baseForm: T
): [T, FormEvent<HTMLInputElement>, SetFormEvent<T>] => {
  const [form, setForm] = React.useState<T>(baseForm);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    const name = target.name;
    const val = target.value;
    setForm({ ...form, [name]: val });
  };

  return [form, onChange, setForm];
};
