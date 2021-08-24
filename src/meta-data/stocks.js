import { getStocks } from "../api/stock-manager";

export const stocks = async () => {
  const listStocks = await getStocks();
  console.log(listStocks);
  return listStocks.map((item) => ({
    label: item.name,
    value: item.id,
    permission: item.permission,
  }));
};
