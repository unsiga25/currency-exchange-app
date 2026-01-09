import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useExchangeRates } from '../useExchangeRates';
import { currencyApi } from '../../api/currency.api';
import { dateUtils } from '../../utils/date.utils';
import { QUERY_KEYS, CACHE_TIME, ExchangeDataByDate } from '../../@types/currency.types';
import React from 'react';

// Mock the api and date utils
jest.mock('../../api/currency.api');
jest.mock('../../utils/date.utils');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useExchangeRates', () => {
  const mockBaseCurrency = 'usd';
  const mockSelectedDate = '2024-01-10';
  const mockDates = ['2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10'];
  const mockExchangeData: ExchangeDataByDate = {
    '2024-01-10': {
      eur: 0.85,
      jpy: 110.5,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (dateUtils.getLast7Days as jest.Mock).mockReturnValue(mockDates);
  });

  it('should fetch exchange rates successfully', async () => {
    (currencyApi.fetchExchangeRates as jest.Mock).mockResolvedValue(mockExchangeData);

    const { result } = renderHook(() => useExchangeRates(mockBaseCurrency, mockSelectedDate), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockExchangeData);
    expect(currencyApi.fetchExchangeRates).toHaveBeenCalledWith(mockBaseCurrency, mockDates);
    expect(currencyApi.fetchExchangeRates).toHaveBeenCalledTimes(1);
  });

  it('should call getLast7Days with selectedDate', async () => {
    (currencyApi.fetchExchangeRates as jest.Mock).mockResolvedValue(mockExchangeData);

    renderHook(() => useExchangeRates(mockBaseCurrency, mockSelectedDate), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(dateUtils.getLast7Days).toHaveBeenCalledWith(mockSelectedDate));
  });



  it('should be disabled when baseCurrency is empty', () => {
    const { result } = renderHook(() => useExchangeRates('', mockSelectedDate), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
    expect(currencyApi.fetchExchangeRates).not.toHaveBeenCalled();
  });

  it('should be disabled when selectedDate is empty', () => {
    const { result } = renderHook(() => useExchangeRates(mockBaseCurrency, ''), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
    expect(currencyApi.fetchExchangeRates).not.toHaveBeenCalled();
  });

  it('should be disabled when both baseCurrency and selectedDate are empty', () => {
    const { result } = renderHook(() => useExchangeRates('', ''), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
    expect(currencyApi.fetchExchangeRates).not.toHaveBeenCalled();
  });


  it('should memoize dates calculation', () => {
    (currencyApi.fetchExchangeRates as jest.Mock).mockResolvedValue(mockExchangeData);

    const { rerender } = renderHook(() => useExchangeRates(mockBaseCurrency, mockSelectedDate), {
      wrapper: createWrapper(),
    });

    // Re-render with same props
    rerender();

    expect(dateUtils.getLast7Days).toHaveBeenCalledTimes(1);
  });

  it('should recalculate dates when selectedDate changes', () => {
    (currencyApi.fetchExchangeRates as jest.Mock).mockResolvedValue(mockExchangeData);
    const newSelectedDate = '2024-01-11';

    const { rerender } = renderHook(
      ({ baseCurrency, selectedDate }) => useExchangeRates(baseCurrency, selectedDate),
      {
        wrapper: createWrapper(),
        initialProps: { baseCurrency: mockBaseCurrency, selectedDate: mockSelectedDate },
      }
    );

    // Re-render with different selectedDate
    rerender({ baseCurrency: mockBaseCurrency, selectedDate: newSelectedDate });

    expect(dateUtils.getLast7Days).toHaveBeenCalledTimes(2);
    expect(dateUtils.getLast7Days).toHaveBeenLastCalledWith(newSelectedDate);
  });
});
