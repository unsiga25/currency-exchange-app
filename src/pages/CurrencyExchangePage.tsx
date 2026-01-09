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
import { DEFAULT_CURRENCIES } from '../@types/currency.types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { CurrencySelector } from '../components/CurrencySelector';
import { DateSelector } from '../components/DateSelector';
import { AddCurrencyPanel } from '../components/AddCurrencyPanel';
import { ExchangeRateTable } from '../components/ExchangeRateTable';
import { InfoBanner } from '../components/InfoBanner';
import '../styles/main.scss';

export const CurrencyExchangePage = () => {
  const [baseCurrency, setBaseCurrency] = useState('gbp');
  const [selectedDate, setSelectedDate] = useState(dateUtils.getMaxDate());
  const [selectedCurrencies, setSelectedCurrencies] = useState([...DEFAULT_CURRENCIES]);
  const [showAddCurrency, setShowAddCurrency] = useState(false);

  const minDate = useMemo(() => dateUtils.getMinDate(), []);
  const maxDate = useMemo(() => dateUtils.getMaxDate(), []);
  const dates = useMemo(() => dateUtils.getLast7Days(selectedDate), [selectedDate]);

  const {
    data: allCurrencies = {},
    isLoading: currenciesLoading,
    isError: currenciesError,
  } = useCurrencies();

  const {
    data: exchangeData = {},
    isLoading: ratesLoading,
    isError: ratesError,
    refetch: refetchRates,
  } = useExchangeRates(baseCurrency, selectedDate);

  const availableCurrenciesToAdd = useMemo(() => {
    return currencyUtils.filterAvailableCurrencies(
      allCurrencies,
      selectedCurrencies,
      baseCurrency
    );
  }, [allCurrencies, selectedCurrencies, baseCurrency]);

  const handleAddCurrency = (currencyCode: string) => {
    if (currencyValidator.canAddCurrency(selectedCurrencies)) {
      setSelectedCurrencies([...selectedCurrencies, currencyCode as typeof selectedCurrencies[number]]);
      setShowAddCurrency(false);
    }
  };

  const handleRemoveCurrency = (currencyCode: string) => {
    if (currencyValidator.canRemoveCurrency(selectedCurrencies)) {
      setSelectedCurrencies(selectedCurrencies.filter((c) => c !== currencyCode));
    }
  };

  const canAddMore = currencyValidator.canAddCurrency(selectedCurrencies);
  const canRemove = currencyValidator.canRemoveCurrency(selectedCurrencies);

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
                onClick={() => setShowAddCurrency(!showAddCurrency)}
              >
                Add
              </Button>
            )}
          </Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() => refetchRates()}
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