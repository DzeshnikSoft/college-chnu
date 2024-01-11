import { PageDto } from '@/models/api';
import { useState, useEffect } from 'react';

interface Props {
	id?: string;
	subCategoryId?: string;
}

export const useInitialPageState = ({ id, subCategoryId }: Props) => {
	const [pageDataState, setPageDataState] = useState<PageDto>({
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

	return { pageDataState, setPageDataState };
};
