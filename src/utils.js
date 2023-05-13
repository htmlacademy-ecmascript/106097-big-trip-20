import dayjs from 'dayjs';

const DATE_FORMAT_FOR_TAG = 'YYYY-MM-DD';
const DATE_FORMAT_FOR_HUMAN = 'MMM D';
const TIME_FORMAT = 'hh:mm';
const DURATION_FORMAT = 'mm';

const formatDataForTag = (date) => date ? dayjs(date).format(DATE_FORMAT_FOR_TAG) : '';
const formatDataForHuman = (date) => date ? dayjs(date).format(DATE_FORMAT_FOR_HUMAN) : '';
const formatTime = (date) => date ? dayjs(date).format(TIME_FORMAT) : '';
const getDuration = (start, end) => dayjs(end - start).format(DURATION_FORMAT);

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export {getRandomArrayElement, formatDataForTag, formatDataForHuman, formatTime, getDuration};
