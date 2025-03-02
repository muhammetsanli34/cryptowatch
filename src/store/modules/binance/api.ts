import axios from "axios";

export interface BinanceTicker {
  id: string;
  symbol: string;
  price: number;
}

export const fetchAllBinancePrices = async (): Promise<BinanceTicker[]> => {
  const response = await axios.get("https://api.binance.com/api/v3/ticker/price");
  return response.data.map((item: { symbol: string; price: string }) => ({
    id: item.symbol,
    symbol: item.symbol,
    price: parseFloat(item.price),
  }));
};
