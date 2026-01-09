import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorMessageProps {
  message: string;
  title?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, title = 'Error' }) => (
  <Alert severity="error" icon={<ErrorOutlineIcon />} className="error-message">
    <AlertTitle>{title}</AlertTitle>
    {message}
  </Alert>
);