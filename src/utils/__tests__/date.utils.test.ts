import { dateUtils } from '../date.utils';

describe('Date Utils', () => {
  describe('getLast7Days', () => {
    it('should return an array of 7 dates ending with the given date', () => {
      const endDate = '2023-10-07';
      const result = dateUtils.getLast7Days(endDate);
      expect(result).toHaveLength(7);
      expect(result[6]).toBe(endDate);
      expect(result[0]).toBe('2023-10-01');
    });
  });

  describe('getMinDate', () => {
    it('should return a date 90 days ago', () => {
      const today = new Date();
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - 90);
      const expectedString = expectedDate.toISOString().split('T')[0];
      
      expect(dateUtils.getMinDate()).toBe(expectedString);
    });
  });

  describe('getMaxDate', () => {
    it('should return today\'s date', () => {
      const today = new Date().toISOString().split('T')[0];
      expect(dateUtils.getMaxDate()).toBe(today);
    });
  });

  describe('formatDate', () => {
    it('should format date string correctly', () => {
      const dateString = '2023-10-01';
      // Note: The output depends on the locale and timezone, but we can check if it contains the month and day
      const result = dateUtils.formatDate(dateString);
      expect(result).toMatch(/Oct/);
      expect(result).toMatch(/01/);
    });
  });
});
