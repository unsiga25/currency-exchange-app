import currencyReducer, {
  setBaseCurrency,
  setSelectedDate,
  addCurrency,
  removeCurrency,
  toggleAddCurrency,
  setShowAddCurrency,
} from '../currencySlice';
import { DEFAULT_CURRENCIES } from '../../../@types/currency.types';

describe('currencySlice', () => {
  const initialState = {
    baseCurrency: 'gbp',
    selectedCurrencies: [...DEFAULT_CURRENCIES],
    selectedDate: new Date().toISOString().split('T')[0],
    showAddCurrency: false,
  };

  it('should handle initial state', () => {
    expect(currencyReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setBaseCurrency', () => {
    const actual = currencyReducer(initialState, setBaseCurrency('usd'));
    expect(actual.baseCurrency).toEqual('usd');
  });

  it('should handle setSelectedDate', () => {
    const date = '2023-10-01';
    const actual = currencyReducer(initialState, setSelectedDate(date));
    expect(actual.selectedDate).toEqual(date);
  });

  it('should handle addCurrency', () => {
    // Assuming DEFAULT_CURRENCIES has less than 7 items
    const currencyToAdd = 'jpy';
    const actual = currencyReducer(initialState, addCurrency(currencyToAdd));
    expect(actual.selectedCurrencies).toContain(currencyToAdd);
  });

  it('should not add currency if max limit reached', () => {
    const stateWithMaxCurrencies = {
      ...initialState,
      selectedCurrencies: ['usd', 'eur', 'gbp', 'aud', 'cad', 'chf', 'cny'],
    };
    const actual = currencyReducer(stateWithMaxCurrencies, addCurrency('jpy'));
    expect(actual.selectedCurrencies).toHaveLength(7);
    expect(actual.selectedCurrencies).not.toContain('jpy');
  });

  it('should not add duplicate currency', () => {
    const currencyToAdd = DEFAULT_CURRENCIES[0];
    const actual = currencyReducer(initialState, addCurrency(currencyToAdd));
    expect(actual.selectedCurrencies).toHaveLength(DEFAULT_CURRENCIES.length);
  });

  it('should handle removeCurrency', () => {
    const currencyToRemove = DEFAULT_CURRENCIES[0];
    const actual = currencyReducer(initialState, removeCurrency(currencyToRemove));
    expect(actual.selectedCurrencies).not.toContain(currencyToRemove);
  });

  it('should not remove currency if min limit reached', () => {
    const stateWithMinCurrencies = {
      ...initialState,
      selectedCurrencies: ['usd', 'eur', 'gbp'],
    };
    const actual = currencyReducer(stateWithMinCurrencies, removeCurrency('usd'));
    expect(actual.selectedCurrencies).toHaveLength(3);
    expect(actual.selectedCurrencies).toContain('usd');
  });

  it('should handle toggleAddCurrency', () => {
    const actual = currencyReducer(initialState, toggleAddCurrency());
    expect(actual.showAddCurrency).toBe(true);
    const actual2 = currencyReducer(actual, toggleAddCurrency());
    expect(actual2.showAddCurrency).toBe(false);
  });

  it('should handle setShowAddCurrency', () => {
    const actual = currencyReducer(initialState, setShowAddCurrency(true));
    expect(actual.showAddCurrency).toBe(true);
  });
});
