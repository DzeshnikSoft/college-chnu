import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/store/baseUrl";

export const categoriesApi = createApi({
	reducerPath: "api",
	baseQuery,
	tagTypes: ["Categories"],
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => "/Categories",
			providesTags: ["Categories"],
		}),
		addCategory: builder.mutation({
			query: (data) => ({
				url: "Categories",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Categories"],
		}),
		updateCategory: builder.mutation({
			query: (data) => ({
				url: `Categories`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Categories"],
		}),
		deleteCategory: builder.mutation({
			query: (CategoryId) => ({
				url: `Categories/${CategoryId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Categories"],
		}),
	}),
});

export const {
	useGetCategoriesQuery,
	useAddCategoryMutation,
	useDeleteCategoryMutation,
	useUpdateCategoryMutation,
} = categoriesApi;
