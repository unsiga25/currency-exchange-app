import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface DateSelectorProps {
  value: string;
  onChange: (value: string) => void;
  minDate: string;
  maxDate: string;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ value, onChange, minDate, maxDate }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      fullWidth
      type="date"
      label="Select End Date (Last 7 Days)"
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CalendarTodayIcon />
          </InputAdornment>
        ),
      }}
      inputProps={{
        min: minDate,
        max: maxDate,
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};