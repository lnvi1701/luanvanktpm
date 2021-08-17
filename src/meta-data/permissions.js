import { getPermissions } from "../api/stock-manager";

export const listPermissions = async () => {
  const listCategories = await getPermissions();
  return listCategories.map((item) => ({ label: item.name, value: item.id }));
};
