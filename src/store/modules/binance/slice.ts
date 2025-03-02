import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchAllBinancePrices, BinanceTicker } from "./api";

export const binanceAdapter = createEntityAdapter<BinanceTicker>({
  selectId: (ticker) => ticker.id,
});

export const fetchAllBinancePricesThunk = createAsyncThunk(
  "binance/fetchAllPrices",
  async () => {
    return await fetchAllBinancePrices();
  }
);

const binanceSlice = createSlice({
  name: "binance",
  initialState: binanceAdapter.getInitialState({ status: "idle" }),
  reducers: {
    updatePrice: (state, action) => {
      binanceAdapter.updateOne(state, {
        id: action.payload.symbol,
        changes: { price: action.payload.price },
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBinancePricesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBinancePricesThunk.fulfilled, (state, action) => {
        state.status = "idle";
        binanceAdapter.setAll(state, action.payload);
      })
      .addCase(fetchAllBinancePricesThunk.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { updatePrice } = binanceSlice.actions;
export default binanceSlice.reducer;
