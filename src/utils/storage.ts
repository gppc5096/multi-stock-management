import { StockEntry } from '../store/stockSlice';
import { OptionSettings } from '../store/optionSlice';

interface StockState {
  entries: StockEntry[];
}

const STOCK_DATA_KEY = 'msm_stock_data';
const OPTION_DATA_KEY = 'msm_option_data';

// 주식 거래 데이터를 로컬에 저장
export const saveStockData = (data: StockState) => {
  try {
    if (!data) {
      console.warn('No stock data to save');
      return;
    }
    
    const serializedData = JSON.stringify(data);
    localStorage.setItem(STOCK_DATA_KEY, serializedData);
    console.log('Stock data saved:', {
      entriesCount: data.entries.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to save stock data:', error);
  }
};

// 설정 데이터를 로컬에 저장
export const saveOptionData = (data: OptionSettings) => {
  try {
    if (!data) {
      console.warn('No option data to save');
      return;
    }
    
    const serializedData = JSON.stringify(data);
    localStorage.setItem(OPTION_DATA_KEY, serializedData);
    console.log('Option data saved:', {
      categoriesCount: data.categories.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to save option data:', error);
  }
};

// 주식 거래 데이터 불러오기
export const loadStockData = (): StockState | null => {
  try {
    const serializedData = localStorage.getItem(STOCK_DATA_KEY);
    if (!serializedData) {
      console.log('No stock data found in localStorage');
      return null;
    }

    const data = JSON.parse(serializedData) as StockState;
    console.log('Stock data loaded:', {
      entriesCount: data.entries.length,
      timestamp: new Date().toISOString()
    });
    return data;
  } catch (error) {
    console.error('Failed to load stock data:', error);
    return null;
  }
};

// 설정 데이터 불러오기
export const loadOptionData = (): OptionSettings | null => {
  try {
    const serializedData = localStorage.getItem(OPTION_DATA_KEY);
    if (!serializedData) {
      console.log('No option data found in localStorage');
      return null;
    }

    const data = JSON.parse(serializedData) as OptionSettings;
    console.log('Option data loaded:', {
      categoriesCount: data.categories.length,
      timestamp: new Date().toISOString()
    });
    return data;
  } catch (error) {
    console.error('Failed to load option data:', error);
    return null;
  }
};