import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useCurrencies } from '../hooks/useCurrencies';
import { useExchangeRates } from '../hooks/useExchangeRates';
import { dateUtils } from '../utils/date.utils';
import { currencyUtils } from '../utils/currency.utils';
import { currencyValidator } from '../validators/currency.validator';
import { DEFAULT_CURRENCIES, CurrencyCode, CurrencyData, ExchangeDataByDate } from '../@types/currency.types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { CurrencySelector } from '../components/CurrencySelector';
import { DateSelector } from '../components/DateSelector';
import { AddCurrencyPanel } from '../components/AddCurrencyPanel';
import { ExchangeRateTable } from '../components/ExchangeRateTable';
import { InfoBanner } from '../components/InfoBanner';
import '../styles/main.scss';

interface CurrencyExchangePageProps {}

export const CurrencyExchangePage: React.FC<CurrencyExchangePageProps> = () => {
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>('gbp');
  const [selectedDate, setSelectedDate] = useState<string>(dateUtils.getMaxDate());
  const [selectedCurrencies, setSelectedCurrencies] = useState<CurrencyCode[]>([...DEFAULT_CURRENCIES]);
  const [showAddCurrency, setShowAddCurrency] = useState<boolean>(false);

  const minDate: string = useMemo(() => dateUtils.getMinDate(), []);
  const maxDate: string = useMemo(() => dateUtils.getMaxDate(), []);
  const dates: string[] = useMemo(() => dateUtils.getLast7Days(selectedDate), [selectedDate]);

  const {
    data: allCurrencies = {},
    isLoading: currenciesLoading,
    isError: currenciesError,
  }: {
    data?: CurrencyData;
    isLoading: boolean;
    isError: boolean;
  } = useCurrencies();

  const {
    data: exchangeData = {},
    isLoading: ratesLoading,
    isError: ratesError,
    refetch: refetchRates,
  }: {
    data?: ExchangeDataByDate;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
  } = useExchangeRates(baseCurrency, selectedDate);

  const availableCurrenciesToAdd: CurrencyCode[] = useMemo(() => {
    return currencyUtils.filterAvailableCurrencies(
      allCurrencies,
      selectedCurrencies,
      baseCurrency
    );
  }, [allCurrencies, selectedCurrencies, baseCurrency]);

  const handleAddCurrency = (currencyCode: CurrencyCode): void => {
    if (currencyValidator.canAddCurrency(selectedCurrencies)) {
      setSelectedCurrencies([...selectedCurrencies, currencyCode]);
      setShowAddCurrency(false);
    }
  };

  const handleRemoveCurrency = (currencyCode: CurrencyCode): void => {
    if (currencyValidator.canRemoveCurrency(selectedCurrencies)) {
      setSelectedCurrencies(selectedCurrencies.filter((c) => c !== currencyCode));
    }
  };

  const handleToggleAddCurrency = (): void => {
    setShowAddCurrency(!showAddCurrency);
  };

  const handleRefreshRates = (): void => {
    refetchRates();
  };

  const canAddMore: boolean = currencyValidator.canAddCurrency(selectedCurrencies);
  const canRemove: boolean = currencyValidator.canRemoveCurrency(selectedCurrencies);

  if (currenciesLoading) {
    return (
      <Box className="page-container">
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <Box className="page-container">
      <Paper className="main-card">
        <Box className="header">
          <TrendingUpIcon className="header__icon" sx={{ fontSize: 40 }} />
          <Typography className="header__title">Currency Exchange Rate Tracker</Typography>
        </Box>

        <Box className="controls">
          <CurrencySelector
            value={baseCurrency}
            onChange={setBaseCurrency}
            currencies={allCurrencies}
            label="Base Currency"
          />
          <DateSelector
            value={selectedDate}
            onChange={setSelectedDate}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Box>

        <Box className="currency-management">
          <Box className="currency-management__title-section">
            <Typography className="currency-management__title">
              Comparing Currencies ({selectedCurrencies.length}/7)
            </Typography>
            {canAddMore && (
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={handleToggleAddCurrency}
              >
                Add
              </Button>
            )}
          </Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefreshRates}
            disabled={ratesLoading}
          >
            Refresh
          </Button>
        </Box>

        {showAddCurrency && (
          <AddCurrencyPanel
            availableCurrencies={availableCurrenciesToAdd}
            allCurrencies={allCurrencies}
            onAdd={handleAddCurrency}
          />
        )}

        {currenciesError && <ErrorMessage message="Failed to fetch currencies. Please try again." />}

        {ratesError && <ErrorMessage message="Failed to fetch exchange rates. Please try again." />}

        {ratesLoading ? (
          <LoadingSpinner />
        ) : (
          <ExchangeRateTable
            selectedCurrencies={selectedCurrencies}
            dates={dates}
            exchangeData={exchangeData}
            allCurrencies={allCurrencies}
            onRemoveCurrency={handleRemoveCurrency}
            canRemove={canRemove}
          />
        )}

        <InfoBanner baseCurrency={baseCurrency} selectedDate={selectedDate} />
      </Paper>
    </Box>
  );
};