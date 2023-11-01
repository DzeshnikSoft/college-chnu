const url = "Categories";
export const getCategories = (builder) => {
	return builder.query({
		query: () => `/${url}`,
		providesTags: ["Categories"],
	});
};

export const addCategory = (builder) => {
	return builder.mutation({
		query: (data) => ({
			url: url,
			method: "POST",
			body: data,
		}),
		invalidatesTags: ["Categories"],
	});
};

export const updateCategory = (builder) => {
	return builder.mutation({
		query: (data) => ({
			url: url,
			method: "PUT",
			body: data,
		}),
		invalidatesTags: ["Categories"],
	});
};

export const deleteCategory = (builder) => {
	return builder.mutation({
		query: (CategoryId) => ({
			url: `Categories/${CategoryId}`,
			method: "DELETE",
		}),
		invalidatesTags: ["Categories"],
	});
};
