import React from 'react';
import { Paper, Typography } from '@mui/material';
import { dateUtils } from '../utils/date.utils';

interface InfoBannerProps {
  baseCurrency: string;
  selectedDate: string;
}

export const InfoBanner: React.FC<InfoBannerProps> = ({baseCurrency, selectedDate}) => (
  <Paper className="info-banner" elevation={0}>
    <Typography className="info-banner__text">
      <strong>Note:</strong> Exchange rates are shown for the last 7 days ending on{' '}
      {dateUtils.formatDate(selectedDate)}. You can select any date up to 90 days in the past.
      Rates are relative to 1 {baseCurrency.toUpperCase()}.
    </Typography>
  </Paper>
);