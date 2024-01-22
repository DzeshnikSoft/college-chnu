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
	reducers: {},
	extraReducers: (builder) => {
		extraReducersConfigCategories(builder);
		extraReducersConfigSubCategories(builder);
		extraReducersConfigPages(builder);
	},
});

export const getСategoryDataSelector = (state: RootState) =>
	state.category.categories;

export const getСategoryLoadingSelector = (state: RootState) =>
	state.category.loading;

export const getСategoryStatusCodeSelector = (state: RootState) =>
	state.category.statusCode;

export const getCategoryErrorSelector = (state: RootState) =>
	state.category.error;

export default categorySlice.reducer;
