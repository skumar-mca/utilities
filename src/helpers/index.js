export const displayTimeZone = (timeZone) => {
  const timeZoneSplit = timeZone.split('/');
  if (timeZoneSplit.length === 2) {
    if (timeZoneSplit[1] === 'Calcutta') {
      return 'India';
    }

    return (timeZoneSplit[1] || '').replace('_', ' ');
  }
  return timeZone;
};
