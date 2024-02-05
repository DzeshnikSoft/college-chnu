import {
	fetchCategoriesData,
	addCategory,
	updateCategory,
	deleteCategory,
} from './categoryThunks';

import { CategoryDto } from '@/models/api';

const extraReducersConfigCategories = (builder) => {
	//get
	builder.addCase(fetchCategoriesData.pending, (state) => {
		state.loading = true;
		state.error = null;
	});
	builder.addCase(fetchCategoriesData.fulfilled, (state, { payload }) => {
		state.categories = payload.data;
		state.loading = false;
		state.error = null;
	});
	builder.addCase(fetchCategoriesData.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
	});
	//add
	builder.addCase(addCategory.pending, (state) => {
		state.loading = true;
		state.error = null;
	});
	builder.addCase(addCategory.fulfilled, (state, { payload }) => {
		state.categories = [...state.categories, payload.data];
		state.loading = false;
		state.statusCode = payload.statusCode;
		state.error = null;
	});
	builder.addCase(addCategory.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
	});
	//update
	builder.addCase(updateCategory.pending, (state) => {
		state.loading = true;
		state.error = null;
	});

	builder.addCase(updateCategory.fulfilled, (state, { payload }) => {
		const { data } = payload;
		const updatedCategories = state.categories?.map((category) => {
			if (category.id === data.id) {
				return {
					...data,
					subCategories: category.subCategories,
				};
			} else return category;
		});

		return {
			...state,
			categories: updatedCategories,
			loading: false,
			error: null,
		};
	});
	builder.addCase(updateCategory.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
	});
	//delete
	builder.addCase(deleteCategory.pending, (state) => {
		state.loading = true;
		state.error = null;
	});

	builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
		const categoryId = payload;

		state.categories = state.categories?.filter((category: CategoryDto) => {
			return category.id !== categoryId;
		});

		state.loading = false;
		state.error = null;
	});

	builder.addCase(deleteCategory.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
	});
};

export default extraReducersConfigCategories;
