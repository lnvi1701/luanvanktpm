import { getStocks } from "../api/stock-manager";

export const stocks = async () => {
  const listStocks = await getStocks();
  return listStocks.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};
