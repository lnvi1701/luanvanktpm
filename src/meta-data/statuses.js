import { getStatuses } from "../api/stock-manager";

export const statuses = async () => {
  const listStatuses = await getStatuses();
  return listStatuses.map((item) => ({
    label: item.name,
    value: item.id,
    permission: item.permission,
  }));
};
