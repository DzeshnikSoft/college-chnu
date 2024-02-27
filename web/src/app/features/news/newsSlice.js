import { createSlice } from '@reduxjs/toolkit';
import { extraReducersConfigNews } from './newsExtraReducers';

const initialState = {
	data: null,
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

export const getNewsDataSelector = (state) => state.news.data;

export const getNewsLoadingSelector = (state) => state.news.loading;

export default newsSlice.reducer;
