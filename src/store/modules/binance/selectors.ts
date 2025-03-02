import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";
import { binanceAdapter } from "./slice";

const binanceSelectors = binanceAdapter.getSelectors<RootState>((state) => state.binance);

export const selectCryptoPrice = (symbol: string) =>
  createSelector(binanceSelectors.selectEntities, (entities) => entities[symbol]?.price);
