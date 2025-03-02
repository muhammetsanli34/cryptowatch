import { configureStore } from "@reduxjs/toolkit";
import binanceReducer from "./modules/binance/slice";

export const store = configureStore({
  reducer: {
    binance: binanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
