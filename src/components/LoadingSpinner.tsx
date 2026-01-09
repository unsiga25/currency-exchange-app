import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export const LoadingSpinner: React.FC = () => (
  <Box className="loading-container">
    <CircularProgress size={60} />
  </Box>
);