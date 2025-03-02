import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectCryptoPrice } from "@/store/modules/binance/selectors";
import { useState, useEffect } from "react";
import FavoriteButton from "@/components/ui/FavoriteButton";

interface CryptoRowProps {
  symbol: string;
}

const CryptoRow = ({ symbol }: CryptoRowProps) => {
  const price = useSelector((state: RootState) => selectCryptoPrice(symbol)(state));
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number>(0);

  useEffect(() => {
    if (prevPrice !== null && price !== null) {
      setPriceChange(((price - prevPrice) / prevPrice) * 100);
    }
    setPrevPrice(price);
  }, [price]);

  return (
    <div className="flex justify-between px-4 py-2 border-b">
      <span>{symbol}</span>
      <span>${price?.toFixed(2) || "Loading..."}</span>
      <span className={priceChange > 0 ? "text-green-500" : "text-red-500"}>
        {priceChange.toFixed(2)}%
      </span>
      <FavoriteButton symbol={symbol} />
    </div>
  );
};

export default CryptoRow;
