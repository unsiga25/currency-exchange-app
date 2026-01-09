import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { currencyApi } from '../api/currency.api';
import { QUERY_KEYS, CACHE_TIME, CurrencyData } from '../@types/currency.types';

export const useCurrencies = (): UseQueryResult<CurrencyData, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.CURRENCIES],
    queryFn: currencyApi.fetchAllCurrencies,
    staleTime: CACHE_TIME.CURRENCIES,
    retry: 2,
  });
};