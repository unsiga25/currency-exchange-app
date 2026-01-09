import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CURRENCIES } from '../../@types/currency.types';

interface CurrencyState {
  baseCurrency: string;
  selectedCurrencies: string[];
  selectedDate: string;
  showAddCurrency: boolean;
}

const initialState: CurrencyState = {
  baseCurrency: 'gbp',
  selectedCurrencies: [...DEFAULT_CURRENCIES],
  selectedDate: new Date().toISOString().split('T')[0],
  showAddCurrency: false,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, action: PayloadAction<string>) => {
      state.baseCurrency = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    addCurrency: (state, action: PayloadAction<string>) => {
      if (state.selectedCurrencies.length < 7 && !state.selectedCurrencies.includes(action.payload)) {
        state.selectedCurrencies.push(action.payload);
      }
    },
    removeCurrency: (state, action: PayloadAction<string>) => {
      if (state.selectedCurrencies.length > 3) {
        state.selectedCurrencies = state.selectedCurrencies.filter(c => c !== action.payload);
      }
    },
    toggleAddCurrency: (state) => {
      state.showAddCurrency = !state.showAddCurrency;
    },
    setShowAddCurrency: (state, action: PayloadAction<boolean>) => {
      state.showAddCurrency = action.payload;
    },
  },
});

export const {
  setBaseCurrency,
  setSelectedDate,
  addCurrency,
  removeCurrency,
  toggleAddCurrency,
  setShowAddCurrency,
} = currencySlice.actions;

export default currencySlice.reducer;