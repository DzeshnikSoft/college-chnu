import { PageDto } from '@/models/api';
import { useState } from 'react';

const initialPageState: PageDto = {
	id: '',
	title: '',
	url: '',
	subCategoryId: '',
	template: {
		type: 1,
		image: {
			url: '',
			alt: '',
		},
		label: '',
	},
	content: '',
};

export const useInitialPageState = () => {
	const [pageData, setPageData] = useState<PageDto>(initialPageState);

	return { pageData, setPageData };
};
