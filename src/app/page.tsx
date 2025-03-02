"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBinancePricesThunk, updatePrice } from "@/store/modules/binance/slice";
import { RootState, AppDispatch } from "@/store/store";
import { createBinanceWebSocket } from "@/store/modules/binance/socket";
import StoreProvider from "@/providers/StoreProvider";
import CryptoList from "@/components/features/CryptoList";

export default function Home() {
  return (
    <StoreProvider>
      <Dashboard />
    </StoreProvider>
  );
}

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllBinancePricesThunk());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Live Crypto Prices</h1>
      <CryptoList />
    </div>
  );
}
