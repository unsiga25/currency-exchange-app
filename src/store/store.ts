import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './slices/currencySlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;