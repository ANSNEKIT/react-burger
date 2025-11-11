export const isMessageError = (data: unknown): data is { message: string } => {
  // @ts-expect-error message key is optional
  return typeof data === 'object' && !!data && data?.message !== undefined;
};
