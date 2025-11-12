import type { TIngredientDTO } from '@/contracts/ingredientDTO';

export const convertIdsToIngredients = (
  ids: string[],
  maperIngredients: Map<string, TIngredientDTO>
): TIngredientDTO[] => {
  return ids.map((id) => maperIngredients.get(id)).filter(Boolean) as TIngredientDTO[];
};
