import { currencyUtils } from '../currency.utils';

describe('Currency Utils', () => {
  describe('formatCurrencyName', () => {
    it('should return the currency name if it exists', () => {
      const currencies = { USD: 'United States Dollar', EUR: 'Euro' };
      expect(currencyUtils.formatCurrencyName('USD', currencies)).toBe('United States Dollar');
    });

    it('should return the uppercase code if name does not exist', () => {
      const currencies = { USD: 'United States Dollar' };
      expect(currencyUtils.formatCurrencyName('eur', currencies)).toBe('EUR');
    });
  });

  describe('filterAvailableCurrencies', () => {
    it('should filter out selected currencies and base currency', () => {
      const allCurrencies = {
        USD: 'United States Dollar',
        EUR: 'Euro',
        GBP: 'British Pound',
        JPY: 'Japanese Yen',
      };
      const selectedCurrencies = ['EUR'];
      const baseCurrency = 'USD';

      const result = currencyUtils.filterAvailableCurrencies(
        allCurrencies,
        selectedCurrencies,
        baseCurrency
      );

      expect(result).toEqual(['GBP', 'JPY']);
    });

    it('should return all currencies if none selected and not base', () => {
      const allCurrencies = {
        EUR: 'Euro',
        GBP: 'British Pound',
      };
      const selectedCurrencies: string[] = [];
      const baseCurrency = 'USD';

      const result = currencyUtils.filterAvailableCurrencies(
        allCurrencies,
        selectedCurrencies,
        baseCurrency
      );

      expect(result).toEqual(['EUR', 'GBP']);
    });
  });
});
