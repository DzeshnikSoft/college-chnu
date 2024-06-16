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
				const subCategoryIndex = category.subCategories?.findIndex(
					(subCategory) => subCategory.id === subCategoryId
				);

				if (subCategoryIndex !== -1) {
					const updatedSubCategories = [
						...(category.subCategories ?? []),
					];

					updatedSubCategories[subCategoryIndex] = {
						...updatedSubCategories[subCategoryIndex],
						pages: [
							...(updatedSubCategories[subCategoryIndex].pages ||
								[]),
							action.payload,
						],
					};

					return {
						...category,
						subCategories: updatedSubCategories,
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

	builder.addCase(addPage.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
	});
	//update
	builder.addCase(updatePage.pending, (state) => {
		state.loading = true;
		state.error = null;
	});

	builder.addCase(updatePage.fulfilled, (state, action) => {
		const { id, subCategoryId } = action.payload;

		const updatedCategories = state.categories?.map(
			(category: CategoryDto) => {
				const subCategoryIndex = category.subCategories.findIndex(
					(subCategory: SubCategoryDto) =>
						subCategory.id === subCategoryId
				);

				if (subCategoryIndex !== -1) {
					const updatedSubCategories = [...category.subCategories];
					const subCategory = updatedSubCategories[subCategoryIndex];

					const pageIndex = subCategory.pages.findIndex(
						(page: PageDto) => page.id === id
					);

					if (pageIndex !== -1) {
						const updatedPages = [...subCategory.pages];
						updatedPages[pageIndex] = action.payload;

						updatedSubCategories[subCategoryIndex] = {
							...subCategory,
							pages: updatedPages,
						};

						return {
							...category,
							subCategories: updatedSubCategories,
						};
					}
				}

				return category;
			}
		);

		return {
			...state,
			categories: updatedCategories,
			loading: false,
		};
	});

	builder.addCase(updatePage.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
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
		};
	});

	builder.addCase(deletePage.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
	});
};
export default extraReducersConfigPages;
