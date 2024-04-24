import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PageWithTitleWrapper from '../DynamicPage/components/PageWithTitleWrapper';
import { apiClient } from '../../app/apiClient';
import NotFoundPage from '../NotFoundPage';
import SpinnerWrapper from '../../components/SpinnerWrapper';

function SingleNewsPage() {
	const [newsPageData, setNewsPageData] = useState(null);
	const [statusCode, setStatusCode] = useState(0);
	const { name } = useParams();

	useEffect(() => {
		setNewsPageData(null);
		(async () => {
			try {
				const { data } = await apiClient.get(
					`/api/News/by-path/${name}`
				);
				setNewsPageData(data);
			} catch (error) {
				setStatusCode(error.response.status);
			}
		})();
	}, [name]);

	if (statusCode === 404) return <NotFoundPage />;

	if (!newsPageData) return <SpinnerWrapper />;

	return (
		<PageWithTitleWrapper
			url={newsPageData.titleBackgroundImage?.url}
			label={newsPageData.title}
			content={newsPageData.content}
		/>
	);
}

export default SingleNewsPage;
