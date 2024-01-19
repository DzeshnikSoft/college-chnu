import { PageDto } from '@/models/api';

export const initialPageState: PageDto = {
	id: '',
	title: '',
	url: '',
	subCategoryId: '',
	template: {
		type: -1,
		image: {
			url: '',
			alt: '',
		},
		label: '',
	},
	content: '',
};
