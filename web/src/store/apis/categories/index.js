import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../../baseUrl';

import { getCategories } from './endpoints/category';

export const categoriesApi = createApi({
	reducerPath: 'api',
	baseQuery,
	tagTypes: ['Categories'],
	endpoints: (builder) => ({
		getCategories: getCategories(builder),
	}),
});

export const { useGetCategoriesQuery } = categoriesApi;
