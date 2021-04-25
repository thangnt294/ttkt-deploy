export const nowAsDate = () => new Date();
export const nowAsMillis = () => Date.now();

export const formatDate = (dateTime: number) => {
  const date = new Date(dateTime);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  return `${day}${month}${year}`;
};

export const startOfDay = (time: number): number => new Date(time).setUTCHours(0, 0, 0, 0);

export const endOfDay = (time: number): number => new Date(time).setUTCHours(23, 59, 59, 59);
