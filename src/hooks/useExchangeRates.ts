import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import { currencyApi } from '../api/currency.api';
import { dateUtils } from '../utils/date.utils';
import { QUERY_KEYS, CACHE_TIME, ExchangeDataByDate } from '../@types/currency.types';

export const useExchangeRates = (
  baseCurrency: string,
  selectedDate: string
): UseQueryResult<ExchangeDataByDate, Error> => {
  const dates = useMemo(() => dateUtils.getLast7Days(selectedDate), [selectedDate]);

  return useQuery({
    queryKey: [QUERY_KEYS.EXCHANGE_RATES, baseCurrency, selectedDate],
    queryFn: () => currencyApi.fetchExchangeRates(baseCurrency, dates),
    enabled: !!baseCurrency && !!selectedDate,
    staleTime: CACHE_TIME.EXCHANGE_RATES,
    retry: 1,
  });
};