const url = "Page";
export const getPage = (builder) => {
	return builder.query({
		query: (id) => `/${url}/${id}`,
	});
};

export const addPage = (builder) => {
	return builder.mutation({
		query: (data) => ({
			url: url,
			method: "POST",
			body: data,
		}),
		invalidatesTags: ["Categories"],
	});
};

export const updatePage = (builder) => {
	return builder.mutation({
		query: (data) => ({
			url: url,
			method: "PUT",
			body: data,
		}),
		invalidatesTags: ["Categories"],
	});
};

export const deletePage = (builder) => {
	return builder.mutation({
		query: (CategoryId) => ({
			url: `${url}/${CategoryId}`,
			method: "DELETE",
		}),
		invalidatesTags: ["Categories"],
	});
};