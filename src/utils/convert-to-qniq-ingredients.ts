import type { TIngredientDTO } from '@/contracts/ingredientDTO';

export const convertToQniqIngredients = (ings: TIngredientDTO[]): TIngredientDTO[] => {
  const qniqIngs = ings.reduce<TIngredientDTO[]>((acc, ing) => {
    if (ing) {
      const findedIndex = acc.findIndex((el) => el._id === ing._id);
      if (findedIndex !== -1) {
        const ing = acc[findedIndex];
        const count = ing?.count ?? 0;
        ing.count = count + 1;
        acc[findedIndex] = ing;
      } else {
        const copyIng = {
          ...ing,
          count: 1,
        };
        acc.push(copyIng);
      }
    }
    return acc;
  }, []);

  return qniqIngs;
};
