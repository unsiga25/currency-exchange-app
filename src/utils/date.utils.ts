export const dateUtils = {
  getLast7Days: (endDate: string): string[] => {
    const dates: string[] = [];
    const end = new Date(endDate);

    for (let i = 6; i >= 0; i--) {
      const date = new Date(end);
      date.setDate(end.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    return dates;
  },

  getMinDate: (): string => {
    const date = new Date();
    date.setDate(date.getDate() - 90);
    return date.toISOString().split('T')[0];
  },

  getMaxDate: (): string => {
    return new Date().toISOString().split('T')[0];
  },

  formatDate: (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  },
};