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
	builder.addCase(fetchCategoriesData.fulfilled, (state, action) => {
		state.categories = action.payload;
		state.loading = false;
		state.error = null;
	});
	builder.addCase(fetchCategoriesData.rejected, (state, action) => {
		state.loading = false;
		state.error = action.payload || 'Something went wrong';
	});
	//add
	builder.addCase(addCategory.pending, (state) => {
		state.loading = true;
		state.error = null;
	});
	builder.addCase(addCategory.fulfilled, (state, action) => {
		state.categories = [...state.categories, action.payload];
		state.loading = false;
		state.error = null;
	});
	builder.addCase(addCategory.rejected, (state, action) => {
		state.loading = false;
		state.error = action.payload || 'Something went wrong';
	});
	//update
	builder.addCase(updateCategory.pending, (state) => {
		state.loading = true;
		state.error = null;
	});

	builder.addCase(updateCategory.fulfilled, (state, action) => {
		const updatedCategories = state.categories?.map((category) =>
			category.id === action.payload.id ? action.payload : category
		);
		if (state.categories[action.payload.id])
			state.categories[action.payload.id] = action.payload;

		return {
			...state,
			categories: updatedCategories,
			loading: false,
			error: null,
		};
	});
	builder.addCase(updateCategory.rejected, (state, action) => {
		state.loading = false;
		state.error = action.payload || 'Something went wrong';
	});
	//delete
	builder.addCase(deleteCategory.pending, (state) => {
		state.loading = true;
		state.error = null;
	});

	builder.addCase(deleteCategory.fulfilled, (state, action) => {
		state.categories = state.categories?.filter((category: CategoryDto) => {
			return category.id !== action.payload;
		});

		state.loading = false;
		state.error = null;
	});

	builder.addCase(deleteCategory.rejected, (state, action) => {
		state.loading = false;
		state.error = action.payload || 'Something went wrong';
	});
};

export default extraReducersConfigCategories;
