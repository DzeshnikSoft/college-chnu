import {
	addSubCategory,
	updateSubCategory,
	deleteSubCategory,
} from './subCategoriesThunks';
import { CategoryDto, SubCategoryDto } from '@/models/api';

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
		};
	});

	builder.addCase(addSubCategory.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
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
					(subCategory: SubCategoryDto) =>
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
		};
	});

	builder.addCase(updateSubCategory.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
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
				(subCategory: SubCategoryDto) =>
					subCategory.id !== action.payload
			),
		}));

		return {
			...state,
			categories: updatedCategories,
			loading: false,
		};
	});

	builder.addCase(deleteSubCategory.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
	});
};

export default extraReducersConfigSubCategories;
