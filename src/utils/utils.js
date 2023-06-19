import dayjs from 'dayjs';

const DATE_FORMAT_FOR_TAG = 'YYYY-MM-DD';
const DATE_FORMAT_FOR_HUMAN = 'MMM D';
const TIME_FORMAT = 'hh:mm';

const formatDataForTag = (date) => date ? dayjs(date).format(DATE_FORMAT_FOR_TAG) : '';
const formatDataForHuman = (date) => date ? dayjs(date).format(DATE_FORMAT_FOR_HUMAN) : '';
const formatTime = (date) => date ? dayjs(date).format(TIME_FORMAT) : '';
const getDuration = (start, end) => {
  const duration = end - start;

  const days = Math.floor(duration / 1000 / 60 / 60 / 24);
  const hours = Math.floor((duration / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((duration / 1000 / 60) % 60);

  if (days !== 0) {
    return `${days}D${hours}H${minutes}M`;
  }

  if (hours !== 0) {
    return `${hours}H${minutes}M`;
  }

  return `${minutes}M`;
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export {formatDataForTag, formatDataForHuman, formatTime, getDuration, capitalizeFirstLetter};
