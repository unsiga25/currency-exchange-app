import { currencyApi } from '../currency.api';
import jestFetchMock from 'jest-fetch-mock';

describe('currencyApi', () => {
  beforeEach(() => {
    jestFetchMock.resetMocks();
  });

  describe('fetchAllCurrencies', () => {
    it('should fetch all currencies successfully', async () => {
      const mockCurrencies = { usd: 'United States Dollar', eur: 'Euro' };
      jestFetchMock.mockResponseOnce(JSON.stringify(mockCurrencies));

      const result = await currencyApi.fetchAllCurrencies();
      expect(result).toEqual(mockCurrencies);
      expect(jestFetchMock).toHaveBeenCalledWith(expect.stringContaining('currencies.json'));
    });

    it('should throw error on failure', async () => {
      jestFetchMock.mockRejectOnce(new Error('Failed to fetch currencies'));

      await expect(currencyApi.fetchAllCurrencies()).rejects.toThrow('Failed to fetch currencies');
    });
  });

  describe('fetchExchangeRate', () => {
    it('should fetch exchange rate successfully', async () => {
      const mockRate = { date: '2023-10-01', usd: { eur: 0.85 } };
      jestFetchMock.mockResponseOnce(JSON.stringify(mockRate));

      const result = await currencyApi.fetchExchangeRate('usd', '2023-10-01');
      expect(result).toEqual(mockRate);
      expect(jestFetchMock).toHaveBeenCalledWith(expect.stringContaining('currencies/usd.json'));
    });

    it('should return null on failure', async () => {
      jestFetchMock.mockResponseOnce('', { status: 404 });

      const result = await currencyApi.fetchExchangeRate('usd', '2023-10-01');
      expect(result).toBeNull();
    });
  });

  describe('fetchExchangeRates', () => {
    it('should fetch multiple exchange rates', async () => {
      const dates = ['2023-10-01', '2023-10-02'];
      const mockRate1 = { date: '2023-10-01', usd: { eur: 0.85 } };
      const mockRate2 = { date: '2023-10-02', usd: { eur: 0.86 } };

      jestFetchMock.mockResponseOnce(JSON.stringify(mockRate1));
      jestFetchMock.mockResponseOnce(JSON.stringify(mockRate2));

      const result = await currencyApi.fetchExchangeRates('usd', dates);
      expect(result).toEqual({
        '2023-10-01': { eur: 0.85 },
        '2023-10-02': { eur: 0.86 },
      });
    });
  });
});
