import dayjs from 'dayjs';
import 'dayjs/locale/uk';

dayjs.locale('uk');

export const getDate = (dateString) =>
	dayjs(dateString).format('D MMMM, YYYY [в] HH:mm');
