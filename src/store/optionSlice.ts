import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OptionItem {
  id: string;
  value: string;
  label: string;
}

export interface OptionCategory {
  id: string;
  name: string;
  items: OptionItem[];
}

export interface OptionSettings {
  categories: OptionCategory[];
  exchangeRate: number;
}

const initialState: OptionSettings = {
  categories: [
    {
      id: 'transactionType',
      name: '구분',
      items: [
        { id: 'buy', value: 'BUY', label: '매수' },
        { id: 'sell', value: 'SELL', label: '매도' }
      ]
    },
    {
      id: 'currency',
      name: '국가',
      items: [
        { id: 'krw', value: 'KRW', label: 'KRW' },
        { id: 'usd', value: 'USD', label: 'USD' }
      ]
    },
    {
      id: 'broker',
      name: '증권사',
      items: [
        { id: 'hanwha', value: 'HANWHA', label: '한투증권' },
        { id: 'kiwoom', value: 'KIWOOM', label: '키움증권' },
        { id: 'nh', value: 'NH', label: 'NH증권' }
      ]
    },
    {
      id: 'stocks',
      name: '종목명',
      items: [
        { id: '360750', value: '360750', label: 'TIGER 미국S&P500' },
        { id: '133690', value: '133690', label: 'TIGER 미국나스닥100' },
        { id: '465580', value: '465580', label: 'ACE 미국빅테크TOP7PLUS' },
        { id: 'SPLG', value: 'SPLG', label: 'SPDR S&P500ETF' },
        { id: 'QQQ', value: 'QQQ', label: 'NASDAQ100 QQQ ETF' },
        { id: 'QQQM', value: 'QQQM', label: 'INVESCO QQQM ETF' },
        { id: 'TQQQ', value: 'TQQQ', label: 'TEAPRQQQ' },
        { id: 'SMH', value: 'SMH', label: 'VANECK USD ETF' },
        { id: 'TSLA', value: 'TSLA', label: 'TESLA' }
      ]
    },
    {
      id: 'tickers',
      name: '티커명',
      items: [
        { id: '360750', value: '360750', label: '360750' },
        { id: '133690', value: '133690', label: '133690' },
        { id: '465580', value: '465580', label: '465580' },
        { id: 'SPLG', value: 'SPLG', label: 'SPLG' },
        { id: 'QQQ', value: 'QQQ', label: 'QQQ' },
        { id: 'QQQM', value: 'QQQM', label: 'QQQM' },
        { id: 'TQQQ', value: 'TQQQ', label: 'TQQQ' },
        { id: 'SMH', value: 'SMH', label: 'SMH' },
        { id: 'TSLA', value: 'TSLA', label: 'TSLA' }
      ]
    }
  ],
  exchangeRate: 1300
};

const optionSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    addOptionItem: (state, action: PayloadAction<{ categoryId: string; item: OptionItem }>) => {
      const category = state.categories.find(c => c.id === action.payload.categoryId);
      if (category) {
        category.items.push(action.payload.item);
      }
    },
    updateOptionItem: (state, action: PayloadAction<{ 
      categoryId: string; 
      itemId: string; 
      updates: Partial<OptionItem> 
    }>) => {
      const category = state.categories.find(c => c.id === action.payload.categoryId);
      if (category) {
        const item = category.items.find(i => i.id === action.payload.itemId);
        if (item) {
          Object.assign(item, action.payload.updates);
        }
      }
    },
    deleteOptionItem: (state, action: PayloadAction<{ categoryId: string; itemId: string }>) => {
      const category = state.categories.find(c => c.id === action.payload.categoryId);
      if (category) {
        category.items = category.items.filter(item => item.id !== action.payload.itemId);
      }
    },
    updateExchangeRate: (state, action: PayloadAction<number>) => {
      state.exchangeRate = action.payload;
    },
    updateEntireOptions: (state, action: PayloadAction<OptionSettings>) => {
      return action.payload;
    }
  }
});

export const { 
  addOptionItem, 
  updateOptionItem, 
  deleteOptionItem,
  updateExchangeRate,
  updateEntireOptions 
} = optionSlice.actions;

export default optionSlice.reducer;
