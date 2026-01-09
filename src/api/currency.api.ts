import { CurrencyData, ExchangeRateData, ExchangeDataByDate } from '../@types/currency.types';

const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api';

export const currencyApi = {
  fetchAllCurrencies: async (): Promise<CurrencyData> => {
    const response = await fetch(`${BASE_URL}@latest/v1/currencies.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch currencies');
    }
    return response.json();
  },

  fetchExchangeRate: async (baseCurrency: string, date: string): Promise<ExchangeRateData | null> => {
    const response = await fetch(`${BASE_URL}@${date}/v1/currencies/${baseCurrency}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch rates');
    }
    return response.json();
  },

  fetchExchangeRates: async (baseCurrency: string, dates: string[]): Promise<ExchangeDataByDate> => {
    const ratesPromises = dates.map((date) => currencyApi.fetchExchangeRate(baseCurrency, date));

    const ratesData = await Promise.all(ratesPromises);
    const formattedData: ExchangeDataByDate = {};

    dates.forEach((date, index) => {
      if (ratesData[index] && ratesData[index]![baseCurrency]) {
        formattedData[date] = ratesData[index]![baseCurrency];
      }
    });

    return formattedData;
  },
};