import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StockEntry {
  id: string;
  date: string;
  type: string;
  country: string;
  broker: string;
  stockName: string;
  ticker: string;
  quantity: number;
  exchangeRate: number;
  price: number;
  usdAmount: number;
  krwAmount: number;
}

interface StockState {
  entries: StockEntry[];
  editingEntry: StockEntry | null;
}

const initialState: StockState = {
  entries: [],
  editingEntry: null,
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    addStockEntry: (state, action: PayloadAction<StockEntry>) => {
      state.entries.push(action.payload);
    },
    updateStockEntry: (state, action: PayloadAction<StockEntry>) => {
      const index = state.entries.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    deleteStockEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
    resetStockData: (state) => {
      state.entries = [];
    },
    setEditingEntry: (state, action: PayloadAction<StockEntry | null>) => {
      state.editingEntry = action.payload;
    },
  },
});

export const { 
  addStockEntry, 
  updateStockEntry, 
  deleteStockEntry,
  resetStockData,
  setEditingEntry 
} = stockSlice.actions;

export default stockSlice.reducer;