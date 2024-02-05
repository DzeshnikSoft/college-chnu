import dayjs from 'dayjs';
import 'dayjs/locale/uk';

dayjs.locale('uk');

/**
 * Formats the input date into a string in Ukrainian and indicates the day of the month,
 * full month, year, hours, and minutes.
 * @param {string} dateString - A string representing the date to be formatted.
 * @returns {string} - The date and time are formatted in Ukrainian.
 */
export const formatUkrainianDateTime = (dateString) =>
	dayjs(dateString).format('D MMMM, YYYY [в] HH:mm');
