export const DEFAULT_CURRENCIES = ['usd', 'eur', 'jpy', 'chf', 'cad', 'aud', 'zar'] as const;

export const QUERY_KEYS = {
  CURRENCIES: 'currencies',
  EXCHANGE_RATES: 'exchangeRates',
} as const;

export const CACHE_TIME = {
  CURRENCIES: 24 * 60 * 60 * 1000, // 24 hours
  EXCHANGE_RATES: 5 * 60 * 1000, // 5 minutes
} as const;

export interface CurrencyData {
  [key: string]: string;
}

export interface ExchangeRateData {
  [currency: string]: {
    [targetCurrency: string]: number;
  };
}

export interface ExchangeDataByDate {
  [date: string]: {
    [currency: string]: number;
  };
}

export type CurrencyCode = string;