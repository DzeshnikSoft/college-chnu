import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/store/baseUrl";
import {
	addCategory,
	getCategories,
	updateCategory,
	deleteCategory,
} from "./endpoints/category";
import {
	addSubCategory,
	updateSubCategory,
	deleteSubCategory,
} from "./endpoints/subCategory";
import { addPage, updatePage, getPage, deletePage } from "./endpoints/page";

export const categoriesApi = createApi({
	reducerPath: "api",
	baseQuery,
	tagTypes: ["Categories"],
	endpoints: (builder) => ({
		getCategories: getCategories(builder),
		addCategory: addCategory(builder),
		updateCategory: updateCategory(builder),
		deleteCategory: deleteCategory(builder),
		addSubCategory: addSubCategory(builder),
		updateSubCategory: updateSubCategory(builder),
		deleteSubCategory: deleteSubCategory(builder),
		getPage: getPage(builder),
		addPage: addPage(builder),
		updatePage: updatePage(builder),
		deletePage: deletePage(builder),
	}),
});

export const {
	useGetCategoriesQuery,
	useAddCategoryMutation,
	useDeleteCategoryMutation,
	useUpdateCategoryMutation,
	useAddSubCategoryMutation,
	useDeleteSubCategoryMutation,
	useUpdateSubCategoryMutation,
	useAddPageMutation,
	useUpdatePageMutation,
	useGetPageQuery,
	useDeletePageMutation,
} = categoriesApi;
