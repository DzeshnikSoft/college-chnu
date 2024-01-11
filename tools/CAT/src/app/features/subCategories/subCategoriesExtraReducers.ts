import {
	addSubCategory,
	updateSubCategory,
	deleteSubCategory,
} from './subCategoriesThunks';
import { CategoryDto } from '@/models/api';
import { SubCategoryResState } from '@/models/subCategories';

const extraReducersConfigSubCategories = (builder) => {
	//add
	builder.addCase(addSubCategory.pending, (state) => {
		state.loading = true;
		state.error = null;
	});
	builder.addCase(addSubCategory.fulfilled, (state, action) => {
		const { categoryId } = action.payload;

		const updatedCategories = state.categories?.map(
			(category: CategoryDto) => {
				if (category.id === categoryId) {
					return {
						...category,
						subCategories: [
							...category.subCategories,
							action.payload,
						],
					};
				} else {
					return category;
				}
			}
		);

		return {
			...state,
			categories: updatedCategories,
			loading: false,
			error: null,
		};
	});

	builder.addCase(addSubCategory.rejected, (state, action) => {
		state.loading = false;
		state.error = (action.payload as string) || 'Something went wrong';
	});
	//update
	builder.addCase(updateSubCategory.pending, (state) => {
		state.loading = true;
		state.error = null;
	});

	builder.addCase(updateSubCategory.fulfilled, (state, action) => {
		const { id } = action.payload;

		const updatedCategories = state.categories?.map(
			(category: CategoryDto) => {
				const updatedSubCategories = category.subCategories.map(
					(subCategory: SubCategoryResState) =>
						subCategory.id === id ? action.payload : subCategory
				);

				return {
					...category,
					subCategories: updatedSubCategories,
				};
			}
		);

		return {
			...state,
			categories: updatedCategories,
			loading: false,
			error: null,
		};
	});

	builder.addCase(updateSubCategory.rejected, (state, action) => {
		state.loading = false;
		state.error = (action.payload as string) || 'Something went wrong';
	});
	//delete
	builder.addCase(deleteSubCategory.pending, (state) => {
		state.loading = true;
		state.error = null;
	});

	builder.addCase(deleteSubCategory.fulfilled, (state, action) => {
		const updatedCategories = state.categories?.map((category) => ({
			...category,
			subCategories: category.subCategories.filter(
				(subCategory: SubCategoryResState) =>
					subCategory.id !== action.payload
			),
		}));

		return {
			...state,
			categories: updatedCategories,
			loading: false,
			error: null,
		};
	});

	builder.addCase(deleteSubCategory.rejected, (state, action) => {
		state.loading = false;
		state.error = (action.payload as string) || 'Something went wrong';
	});
};

export default extraReducersConfigSubCategories;
