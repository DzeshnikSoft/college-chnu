import { createSlice } from '@reduxjs/toolkit';
import extraReducersConfigCategories from './categoryExtraReducers';
import { CategoryDto } from '../../../models/api/index';
import { RootState } from '@/app/store';
import extraReducersConfigSubCategories from '../subCategories/subCategoriesExtraReducers';
import extraReducersConfigPages from '../pages/pageExtraRecuders';

interface CategoryInitialState {
	categories: CategoryDto[];
	error: string | null;
	loading: boolean;
}

const initialState: CategoryInitialState = {
	categories: null,
	error: null,
	loading: true,
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

export const getСategoryData = (state: RootState) => state.category.categories;

export const getСategoryLoading = (state: RootState) => state.category.loading;

export default categorySlice.reducer;
