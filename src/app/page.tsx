"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBinancePricesThunk, updatePrice } from "@/store/modules/binance/slice";
import { RootState, AppDispatch } from "@/store/store";
import { createBinanceWebSocket } from "@/store/modules/binance/socket";
import StoreProvider from "@/providers/StoreProvider";
import { selectCryptoPrice } from "@/store/modules/binance/selectors";

export default function Home() {
  return (
    <StoreProvider>
      <CryptoPrices />
    </StoreProvider>
  );
}

function CryptoPrices() {
  const dispatch = useDispatch<AppDispatch>();
  const btcPrice = useSelector((state: RootState) => selectCryptoPrice("BTCUSDT")(state));
  const ethPrice = useSelector((state: RootState) => selectCryptoPrice("ETHUSDT")(state));

  useEffect(() => {
    dispatch(fetchBinancePricesThunk());

    const btcSocket = createBinanceWebSocket("btcusdt", (data) => {
      dispatch(updatePrice({ symbol: data.symbol, price: data.price }));
    });

    const ethSocket = createBinanceWebSocket("ethusdt", (data) => {
      dispatch(updatePrice({ symbol: data.symbol, price: data.price }));
    });

    return () => {
      btcSocket.close();
      ethSocket.close();
    };
  }, [dispatch]);

  return (
    <div>
      <h1>Live Crypto Prices</h1>
      <ul>
        <li>BTC/USDT: ${btcPrice?.toFixed(2) || "Loading..."}</li>
        <li>ETH/USDT: ${ethPrice?.toFixed(2) || "Loading..."}</li>
      </ul>
    </div>
  );
}
