import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { CurrencyData } from '../@types/currency.types';

interface AddCurrencyPanelProps {
  availableCurrencies: string[];
  allCurrencies: CurrencyData;
  onAdd: (code: string) => void;
}

export const AddCurrencyPanel: React.FC<AddCurrencyPanelProps> = ({
  availableCurrencies,
  allCurrencies,
  onAdd,
}) => (
  <Paper className="add-currency-panel" elevation={0}>
    <Typography className="add-currency-panel__title">Add Currency</Typography>
    <Box className="add-currency-panel__grid">
      {availableCurrencies.map((code) => (
        <Button
          key={code}
          variant="outlined"
          onClick={() => onAdd(code)}
          className="add-currency-panel__currency-button"
        >
          <Box>
            <Typography className="add-currency-panel__currency-code">
              {code.toUpperCase()}
            </Typography>
            <Typography className="add-currency-panel__currency-name">
              {allCurrencies[code]}
            </Typography>
          </Box>
        </Button>
      ))}
    </Box>
  </Paper>
);