import { createSlice } from '@reduxjs/toolkit';
import extraReducersConfigCategories from './categoryExtraReducers';
import { CategoryDto } from '../../../models/api/index';
import { RootState } from '@/app/store';
import extraReducersConfigSubCategories from '../subCategories/subCategoriesExtraReducers';
import extraReducersConfigPages from '../pages/pageExtraReduders';

interface CategoryInitialState {
	categories: CategoryDto[];
	error: string | null;
	loading: boolean;
	statusCode: number;
}

const initialState: CategoryInitialState = {
	categories: [],
	error: null,
	loading: true,
	statusCode: 0,
};

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		moveCategory: (state, action) => {
			const { currentIndex, newIndex } = action.payload;
			const movedItem = state.categories.splice(currentIndex, 1)[0];
			state.categories.splice(newIndex, 0, movedItem);
		},
		moveSubCategory: (state, action) => {
			const { currentIndex, newIndex, categoryId } = action.payload;

			const category = state.categories.find(
				(cat) => cat.id === categoryId
			);

			if (category) {
				const subCategories = [...category.subCategories];

				const movedSubCategory = subCategories.splice(
					currentIndex,
					1
				)[0];

				subCategories.splice(newIndex, 0, movedSubCategory);
				category.subCategories = subCategories;
			}
		},

		movePage: (state, action) => {
			const { currentIndex, newIndex, subCategoryId } = action.payload;

			const category = state.categories.find((cat) =>
				cat.subCategories.some((subCat) => subCat.id === subCategoryId)
			);

			if (category) {
				const subCategory = category.subCategories.find(
					(subCat) => subCat.id === subCategoryId
				);

				if (subCategory) {
					const pages = [...subCategory.pages];
					const movedPage = pages.splice(currentIndex, 1)[0];

					pages.splice(newIndex, 0, movedPage);
					subCategory.pages = pages;
				}
			}
		},
	},
	extraReducers: (builder) => {
		extraReducersConfigCategories(builder);
		extraReducersConfigSubCategories(builder);
		extraReducersConfigPages(builder);
	},
});

export const { moveCategory, moveSubCategory, movePage } =
	categorySlice.actions;

export const getСategoryDataSelector = (state: RootState) =>
	state.category.categories;

export const getСategoryLoadingSelector = (state: RootState) =>
	state.category.loading;

export const getСategoryStatusCodeSelector = (state: RootState) =>
	state.category.statusCode;

export const getCategoryErrorSelector = (state: RootState) =>
	state.category.error;

export default categorySlice.reducer;
