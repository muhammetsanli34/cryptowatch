import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchBinancePrices, BinanceTicker } from "./api";

export const binanceAdapter = createEntityAdapter<BinanceTicker>({
  selectId: (ticker) => ticker.id,
});

export const fetchBinancePricesThunk = createAsyncThunk(
  "binance/fetchPrices",
  async () => {
    return await fetchBinancePrices();
  }
);

const binanceSlice = createSlice({
  name: "binance",
  initialState: binanceAdapter.getInitialState({ status: "idle" }),
  reducers: {
    updatePrice: (state, action) => {
      binanceAdapter.updateOne(state, {
        id: action.payload.symbol, // Güncellenen ID "symbol" olmalı
        changes: { price: action.payload.price },
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBinancePricesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBinancePricesThunk.fulfilled, (state, action) => {
        state.status = "idle";
        binanceAdapter.setAll(state, action.payload);
      })
      .addCase(fetchBinancePricesThunk.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { updatePrice } = binanceSlice.actions;
export default binanceSlice.reducer;
