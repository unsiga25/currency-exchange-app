import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { dateUtils } from '../utils/date.utils';
import { currencyUtils } from '../utils/currency.utils';
import { CurrencyData, ExchangeDataByDate } from '../@types/currency.types';

interface ExchangeRateTableProps {
  selectedCurrencies: string[];
  dates: string[];
  exchangeData: ExchangeDataByDate;
  allCurrencies: CurrencyData;
  onRemoveCurrency: (code: string) => void;
  canRemove: boolean;
}

export const ExchangeRateTable: React.FC<ExchangeRateTableProps> = ({
  selectedCurrencies,
  dates,
  exchangeData,
  allCurrencies,
  onRemoveCurrency,
  canRemove,
}) => (
  <TableContainer component={Paper} className="exchange-table">
    <Table className="exchange-table__container">
      <TableHead>
        <TableRow sx={{ backgroundColor: 'primary.main' }}>
          <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Currency</TableCell>
          {dates.map((date) => (
            <TableCell key={date} align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
              {dateUtils.formatDate(date)}
            </TableCell>
          ))}
          <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
            Action
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {selectedCurrencies.map((currency, idx) => (
          <TableRow
            key={currency}
            sx={{
              backgroundColor: idx % 2 === 0 ? 'grey.50' : 'white',
              '&:hover': { backgroundColor: 'primary.lighter' },
            }}
          >
            <TableCell className="exchange-table__currency-cell">
              <Box>
                <Typography className="exchange-table__currency-code">
                  {currency.toUpperCase()}
                </Typography>
                <Typography className="exchange-table__currency-name">
                  {currencyUtils.formatCurrencyName(currency, allCurrencies)}
                </Typography>
              </Box>
            </TableCell>
            {dates.map((date) => (
              <TableCell key={date} align="center">
                {exchangeData[date] && exchangeData[date][currency] ? (
                  <Typography className="exchange-table__rate">
                    {exchangeData[date][currency].toFixed(4)}
                  </Typography>
                ) : (
                  <Typography className="exchange-table__na">N/A</Typography>
                )}
              </TableCell>
            ))}
            <TableCell align="center">
              <Tooltip
                title={!canRemove ? 'Minimum 3 currencies required' : 'Remove currency'}
              >
                <span>
                  <IconButton
                    onClick={() => onRemoveCurrency(currency)}
                    disabled={!canRemove}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);