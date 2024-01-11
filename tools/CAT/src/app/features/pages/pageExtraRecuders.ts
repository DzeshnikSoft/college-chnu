import { addPage, updatePage, deletePage } from './pageThunks';
import { PageDto, CategoryDto, SubCategoryDto } from '@/models/api';

const extraReducersConfigPages = (builder) => {
	//add
	builder.addCase(addPage.pending, (state) => {
		state.loading = true;
		state.error = null;
	});
	builder.addCase(addPage.fulfilled, (state, action) => {
		const { subCategoryId } = action.payload;

		const updatedCategories = state.categories?.map(
			(category: CategoryDto) => {
				const updatedSubCategories = category.subCategories?.map(
					(subCategory) => {
						if (subCategory.id === subCategoryId) {
							return {
								...subCategory,
								pages: [...subCategory.pages, action.payload],
							};
						} else {
							return subCategory;
						}
					}
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

	builder.addCase(addPage.rejected, (state, action) => {
		state.loading = false;
		state.error = action.payload || 'Something went wrong';
	});
	//update
	builder.addCase(updatePage.pending, (state) => {
		state.loading = true;
		state.error = null;
	});

	builder.addCase(updatePage.fulfilled, (state, action) => {
		const { id } = action.payload;

		const updatedCategories = state.categories?.map(
			(category: CategoryDto) => {
				const updatedSubCategories = category.subCategories.map(
					(subCategory: SubCategoryDto) => {
						const updatedPages = subCategory.pages.map(
							(page: PageDto) =>
								page.id === id ? action.payload : page
						);

						return {
							...subCategory,
							pages: updatedPages,
						};
					}
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

	builder.addCase(updatePage.rejected, (state, action) => {
		state.loading = false;
		state.error = action.payload || 'Something went wrong';
	});
	//delete
	builder.addCase(deletePage.pending, (state) => {
		state.loading = true;
		state.error = null;
	});

	builder.addCase(deletePage.fulfilled, (state, action) => {
		const pageIdToDelete = action.payload;

		const updatedCategories = state.categories?.map((category) => {
			const updatedSubCategories = category.subCategories?.map(
				(subCategory) => {
					const updatedPages = subCategory.pages?.filter(
						(page) => page.id !== pageIdToDelete
					);

					return {
						...subCategory,
						pages: updatedPages,
					};
				}
			);

			return {
				...category,
				subCategories: updatedSubCategories,
			};
		});

		return {
			...state,
			categories: updatedCategories,
			loading: false,
			error: null,
		};
	});

	builder.addCase(deletePage.rejected, (state, action) => {
		state.loading = false;
		state.error = action.payload || 'Something went wrong';
	});
};
export default extraReducersConfigPages;
