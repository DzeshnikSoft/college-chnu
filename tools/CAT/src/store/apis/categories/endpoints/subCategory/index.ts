const url = "api/SubCategory";

export const addSubCategory = (builder) => {
	return builder.mutation({
		query: (data) => ({
			url: url,
			method: "POST",
			body: data,
		}),
		invalidatesTags: ["Categories"],
	});
};

export const updateSubCategory = (builder) => {
	return builder.mutation({
		query: (data) => ({
			url: url,
			method: "PUT",
			body: data,
		}),
		invalidatesTags: ["Categories"],
	});
};

export const deleteSubCategory = (builder) => {
	return builder.mutation({
		query: (SubCategoryId) => ({
			url: `${url}/${SubCategoryId}`,
			method: "DELETE",
		}),
		invalidatesTags: ["Categories"],
	});
};
