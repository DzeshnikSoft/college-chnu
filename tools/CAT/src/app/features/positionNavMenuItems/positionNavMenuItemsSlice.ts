import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { extraReducersConfigPositionNavMenuItems } from './positionNavMenuItemsExtraReducers';

interface PositionNavMenuItemsState {
	data: Category[];
	error: string;
	loading: boolean;
	isUpdated: boolean;
}

interface Category {
	categoryId: string;
	subCategories: SubCategory[];
}

interface SubCategory {
	subCategoryId: string;
	pages: Page[];
}

interface Page {
	pageId: string;
}

const initialState: PositionNavMenuItemsState = {
	data: null,
	error: null,
	loading: true,
	isUpdated: true,
};

const positionNavMenuItemsSlice = createSlice({
	name: 'positionNavMenuItems',
	initialState,
	reducers: {
		activateIsUpdated: (state) => {
			state.isUpdated = true;
		},
		deactivateIsUpdated: (state) => {
			state.isUpdated = false;
		},
	},
	extraReducers: (builder) => {
		extraReducersConfigPositionNavMenuItems(builder);
	},
});

export const { activateIsUpdated, deactivateIsUpdated } =
	positionNavMenuItemsSlice.actions;

export const getPositionNavMenuItemsDataSelector = (state: RootState) =>
	state.positionNavMenuItems.data;

export const getPositionNavMenuItemsIsUpdatedSelector = (state: RootState) =>
	state.positionNavMenuItems.isUpdated;

export const getPositionNavMenuItemsLoadingSelector = (state: RootState) =>
	state.positionNavMenuItems.loading;

export const getPositionNavMenuItemsErrorSelector = (state: RootState) =>
	state.positionNavMenuItems.error;

export default positionNavMenuItemsSlice.reducer;
