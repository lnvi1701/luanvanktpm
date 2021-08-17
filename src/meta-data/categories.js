import { getCategories } from "../api/stock-manager";

export const getListCategories = async () => {
  const listCategories = await getCategories();
  return listCategories.map((item) => ({ label: item.name, value: item.id }));
};
