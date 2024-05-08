import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpinnerWrapper from '../../components/SpinnerWrapper';
import DefaultPage from './components/DefaultPage';
import PageWithTitleWrapper from './components/PageWithTitleWrapper';
import NotFoundPage from '../NotFoundPage';
import { getNavMenuData } from '../../app/features/navMenu/navMenuSlice';
import { apiClient } from '../../app/apiClient';

function DynamicPage() {
	const { category, subcategory, page } = useParams();
	const [statusCode, setStatusCode] = useState(0);
	const [pageData, setPageData] = useState(null);
	const dataNavMenu = useSelector(getNavMenuData);

	useEffect(() => {
		setPageData(null);
		if (dataNavMenu.length > 0) {
			(async () => {
				try {
					const { data } = await apiClient.get(
						`/api/Page/by-path?path=${category}/${subcategory}/${page}`
					);
					setPageData(data);
				} catch (error) {
					setStatusCode(error.response.status);
				}
			})();
		}
	}, [category, subcategory, page]);

	const getPageByType = (template, content) => {
		const { type, image, label } = template;
		switch (type) {
			case 0:
				return <DefaultPage content={content} />;
			case 1:
				return (
					<PageWithTitleWrapper
						content={content}
						url={image?.url}
						label={label}
					/>
				);
			default:
				return null;
		}
	};

	if (statusCode === 404) return <NotFoundPage />;

	if (!pageData)
		return (
			<div className='m-auto'>
				<SpinnerWrapper />
			</div>
		);

	return (
		<div className='w-full h-full flex flex-1'>
			{pageData && getPageByType(pageData?.template, pageData?.content)}
		</div>
	);
}

export default DynamicPage;
