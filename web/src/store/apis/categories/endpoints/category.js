const url = 'api/Categories';
export const getCategories = (builder) => {
	return builder.query({
		query: () => `/${url}`,
		providesTags: ['Categories'],
	});
};
