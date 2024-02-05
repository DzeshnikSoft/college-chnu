import { NewsDto } from '@/models/api';

export const sortNewsArrayByPinnedAndDate = (
	newsArray: NewsDto[]
): NewsDto[] => {
	return newsArray.sort((a, b) => {
		if (a.pinned && !b.pinned) {
			return -1;
		} else if (!a.pinned && b.pinned) {
			return 1;
		} else {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		}
	});
};
