export const getResponse = <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
};
