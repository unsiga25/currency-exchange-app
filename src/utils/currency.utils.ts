import { CurrencyData } from '../@types/currency.types';

export const currencyUtils = {
  formatCurrencyName: (code: string, allCurrencies: CurrencyData): string => {
    return allCurrencies[code] || code.toUpperCase();
  },

  filterAvailableCurrencies: (
    allCurrencies: CurrencyData,
    selectedCurrencies: string[],
    baseCurrency: string
  ): string[] => {
    return Object.keys(allCurrencies)
      .filter((code) => !selectedCurrencies.includes(code) && code !== baseCurrency)
      .sort();
  },
};