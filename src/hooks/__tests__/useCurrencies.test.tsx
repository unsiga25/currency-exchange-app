import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCurrencies } from '../useCurrencies';
import { currencyApi } from '../../api/currency.api';
import React from 'react';

// Mock the api
jest.mock('../../api/currency.api');

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

describe('useCurrencies', () => {
  it('should fetch currencies successfully', async () => {
    const mockCurrencies = { usd: 'United States Dollar', eur: 'Euro' };
    (currencyApi.fetchAllCurrencies as jest.Mock).mockResolvedValue(mockCurrencies);

    const { result } = renderHook(() => useCurrencies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockCurrencies);
  });
});
