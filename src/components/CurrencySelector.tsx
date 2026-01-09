import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { CurrencyData } from '../@types/currency.types';

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
  currencies: CurrencyData;
  label: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  value,
  onChange,
  currencies,
  label,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={handleChange} label={label}>
        {Object.keys(currencies)
          .sort()
          .map((code) => (
            <MenuItem key={code} value={code}>
              {code.toUpperCase()} - {currencies[code]}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};