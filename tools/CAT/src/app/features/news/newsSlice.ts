import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { NewsDto } from '@/models/api';
import { PaginationResponse } from '@/models/api';
import { extraReducersConfigNews } from './newsExtraReducers';

interface NewsInitialState {
	data: PaginationResponse<NewsDto>;
	error: string;
	news: NewsDto;
	loading: boolean;
}

const initialState: NewsInitialState = {
	data: null,
	error: null,
	news: null,
	loading: true,
};

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		extraReducersConfigNews(builder);
	},
});

export const getNewsDataSelector = (state: RootState) => state.news.data;

export const getNewsLoadingSelector = (state: RootState) => state.news.loading;

export const getNewsErrorSelector = (state: RootState) => state.news.error;

export const getNewsSelector = (state: RootState) => state.news.news;

export default newsSlice.reducer;
