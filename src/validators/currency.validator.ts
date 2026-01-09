export const currencyValidator = {
  canAddCurrency: (selectedCurrencies: string[], maxCurrencies: number = 7): boolean => {
    return selectedCurrencies.length < maxCurrencies;
  },

  canRemoveCurrency: (selectedCurrencies: string[], minCurrencies: number = 3): boolean => {
    return selectedCurrencies.length > minCurrencies;
  },

  isValidDateRange: (date: string, minDate: string, maxDate: string): boolean => {
    return date >= minDate && date <= maxDate;
  },
};