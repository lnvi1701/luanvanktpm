import { getCategories } from "../api/stock-manager";

export const getListCategories = async () => {
  const listCategories = await getCategories();
  console.log(listCategories);
  return listCategories.map((item) => ({ label: item.name, value: item.id }));
};
