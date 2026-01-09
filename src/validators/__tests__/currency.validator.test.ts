import { currencyValidator } from '../currency.validator';

describe('Currency Validator', () => {
  describe('canAddCurrency', () => {
    it('should return true if selected currencies are less than max', () => {
      const selectedCurrencies = ['USD', 'EUR'];
      expect(currencyValidator.canAddCurrency(selectedCurrencies, 5)).toBe(true);
    });

    it('should return false if selected currencies are equal to max', () => {
      const selectedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];
      expect(currencyValidator.canAddCurrency(selectedCurrencies, 5)).toBe(false);
    });
  });

  describe('canRemoveCurrency', () => {
    it('should return true if selected currencies are more than min', () => {
      const selectedCurrencies = ['USD', 'EUR', 'GBP', 'JPY'];
      expect(currencyValidator.canRemoveCurrency(selectedCurrencies, 3)).toBe(true);
    });

    it('should return false if selected currencies are equal to min', () => {
      const selectedCurrencies = ['USD', 'EUR', 'GBP'];
      expect(currencyValidator.canRemoveCurrency(selectedCurrencies, 3)).toBe(false);
    });
  });

  describe('isValidDateRange', () => {
    it('should return true if date is within range', () => {
      const date = '2023-10-05';
      const minDate = '2023-10-01';
      const maxDate = '2023-10-10';
      expect(currencyValidator.isValidDateRange(date, minDate, maxDate)).toBe(true);
    });

    it('should return false if date is before min date', () => {
      const date = '2023-09-30';
      const minDate = '2023-10-01';
      const maxDate = '2023-10-10';
      expect(currencyValidator.isValidDateRange(date, minDate, maxDate)).toBe(false);
    });

    it('should return false if date is after max date', () => {
      const date = '2023-10-11';
      const minDate = '2023-10-01';
      const maxDate = '2023-10-10';
      expect(currencyValidator.isValidDateRange(date, minDate, maxDate)).toBe(false);
    });
  });
});
