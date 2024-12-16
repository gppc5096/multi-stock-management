import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './stockSlice';
import optionReducer from './optionSlice';
import { saveStockData, saveOptionData, loadStockData, loadOptionData } from '../utils/storage';

// Load saved data or use initial state
const savedStockData = loadStockData();
const savedOptionData = loadOptionData();

console.log('Initializing store with saved data:', { 
  stockEntries: savedStockData?.entries?.length || 0,
  hasOptionData: !!savedOptionData 
});

const store = configureStore({
  reducer: {
    stock: stockReducer,
    options: optionReducer,
  },
  preloadedState: {
    stock: savedStockData || { entries: [] },
    options: savedOptionData || undefined
  },
});

// Save state changes automatically
store.subscribe(() => {
  const state = store.getState();
  
  // Save both states whenever there's a change
  saveStockData(state.stock);
  saveOptionData(state.options);
  
  console.log('State updated and saved:', {
    stockEntries: state.stock.entries.length,
    hasOptions: !!state.options
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };