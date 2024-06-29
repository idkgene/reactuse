'use client';

import { useDateFormat } from './use-date-format';

const DateDisplay: React.FC = () => {
  const now = new Date();
  const formattedDate = useDateFormat(now, 'YYYY-MM-DD HH:mm:ss:ddd', {
    locales: 'en-US',
  });

  return <div>{formattedDate}</div>;
};

export default DateDisplay;
