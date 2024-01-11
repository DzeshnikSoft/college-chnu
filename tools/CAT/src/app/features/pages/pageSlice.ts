import { createSlice } from '@reduxjs/toolkit';
import { PageDto } from '../../../models/api/index';
import { RootState } from '@/app/store';
import { fetchPageByPath, updatePage } from './pageThunks';

interface PageState {
	pageData: PageDto;
	error: string | null;
	loading: boolean;
}

const initialState: PageState = {
	pageData: null,
	error: null,
	loading: true,
};

const pageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		//get
		builder.addCase(fetchPageByPath.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(fetchPageByPath.fulfilled, (state, action) => {
			state.pageData = action.payload;
			state.loading = false;
		});
		builder.addCase(fetchPageByPath.rejected, (state, action) => {
			state.loading = false;
			state.error = (action.payload as string) || 'Something went wrong';
		});
		//update
		builder.addCase(updatePage.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(updatePage.fulfilled, (state, action) => {
			state.pageData = action.payload;
			state.loading = false;
		});
		builder.addCase(updatePage.rejected, (state, action) => {
			state.loading = false;
			state.error = (action.payload as string) || 'Something went wrong';
		});
	},
});

export const getPageData = (state: RootState) => state.page.pageData;

export const getPageLoading = (state: RootState) => state.page.loading;

export default pageSlice.reducer;
