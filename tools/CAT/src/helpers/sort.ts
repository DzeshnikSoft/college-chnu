import { NewsDto } from '@/models/api';
import dayjs from 'dayjs';

export const sortNewsArrayByPinnedAndDate = (
	newsArray: NewsDto[]
): NewsDto[] => {
	return newsArray.sort((a, b) => {
		if (a.pinned && !b.pinned) {
			return -1;
		} else if (!a.pinned && b.pinned) {
			return 1;
		} else {
			return dayjs(b.date).unix() - dayjs(a.date).unix();
		}
	});
};
