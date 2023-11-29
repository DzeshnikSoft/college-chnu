import { PageDto } from '@/models/api';
import { useState, useEffect } from 'react';

interface Props {
	id?: string;
	subCategoryId?: string;
}

export const useInitialPageState = ({ id, subCategoryId }: Props) => {
	const [pageData, setPageData] = useState<PageDto>({
		id: id,
		title: '',
		url: '',
		subCategoryId: subCategoryId,
		template: {
			type: -1,
			image: {
				url: '',
				alt: '',
			},
			label: '',
		},
		content: '',
	});

	return { pageData, setPageData };
};
